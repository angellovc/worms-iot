import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Server } from 'socket.io';
import { Agent } from 'src/agents/entities/agent.entity';
import { IncidentService } from 'src/incidents/service/incident.service';
import { Limit } from 'src/limits/entities/limit.entity';
import { MailService } from 'src/mail/services/mail.service';
import { Metric } from 'src/metrics/entities/metric.entity';
import { User } from 'src/users/entities/user.entity';
import { DeviceMessage } from './entities/device-message.entity';

@WebSocketGateway(parseInt(process.env.SOCKET_PORT), {
    cors: {
        origin: '*',
    },
})
export class EventGateway {

    private logger = new Logger('EventGateway');


    constructor(
        @InjectModel(Metric.name) private metricModel: Model<Metric>,
        @InjectModel(Agent.name) private agentModel: Model<Agent>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Limit.name) private limitModel: Model<Limit>,
        private incidentService: IncidentService,
        private mailService: MailService,
    ) { }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    async deviceMessage(@MessageBody() data: DeviceMessage): Promise<void> {
        this.logger.log(data);
        // Store agent
        let agent = await this.agentModel.findOne({ name: data.agent });
        if (agent === null) {
            const newAgent = new this.agentModel();
            newAgent.name = data.agent;
            agent = await newAgent.save();
        }
        // Store Metric
        if (data.metrics) {
            const metric = new this.metricModel();
            metric.temperature = data.metrics.temperature;
            metric.humidity = data.metrics.humidity;
            metric.heatIndex = data.metrics.heatIndex;
            metric.agent = agent._id;
            await metric.save();
        }
        // Send Metric
        const users = await this.userModel.find({ agent });
        users.forEach(async (user) => {
            const limits: Limit[] = await this.limitModel.find({
                user: user.id,
                agent: agent.id,
            });
            limits.forEach(async (limit: Limit) => {
                if (
                    ((!limit.openIncident &&
                        data.metrics[limit.name] < limit.min) ||
                        (!limit.openIncident &&
                            data.metrics[limit.name] > limit.max))
                ) {
                    const incident = await this.incidentService.create(data.metrics[limit.name]);
                    limit.openIncident = incident.id;
                    limit.incidents.push(incident);
                    this.logger.log(`created incident ${limit.openIncident}`);
                    await Promise.all([
                        limit.save(),
                        this.mailService.sendOpenIncident(user.email, limit.name, data.metrics[limit.name])
                    ]);
                    return;
                }

                if (
                    limit.openIncident &&
                    data.metrics[limit.name] >= limit.min &&
                    data.metrics[limit.name] <= limit.max
                ) {
                    this.incidentService.close(limit.openIncident);
                    this.logger.log(`closed incident ${limit.openIncident}`);
                    limit.openIncident = null;
                    await Promise.all([
                        limit.save(),
                        this.mailService.sendCloseIncident(user.email, limit.name, data.metrics[limit.name])
                    ]);
                    return;
                }
            });
        });
        this.server.emit(data.agent, data.metrics);
    }
}
