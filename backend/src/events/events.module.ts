import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentSchema, Agent } from 'src/agents/entities/agent.entity';
import { Incident, IncidentSchema } from 'src/incidents/entities/incident.entity';
import { IncidentModule } from 'src/incidents/incident.module';
import { IncidentService } from 'src/incidents/service/incident.service';
import { Limit, LimitSchema } from 'src/limits/entities/limit.entity';
import { MailService } from 'src/mail/services/mail.service';
import { Metric, MetricSchema } from 'src/metrics/entities/metric.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { EventGateway } from './events.gateway';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Metric.name,
                schema: MetricSchema
            },
            {
                name: Agent.name,
                schema: AgentSchema
            },
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: Limit.name,
                schema: LimitSchema
            },
            {
                name: Incident.name,
                schema: IncidentSchema
            }
        ]),
        IncidentModule
    ],
    providers: [EventsModule, EventGateway, IncidentService, MailService]
})
export class EventsModule { }
