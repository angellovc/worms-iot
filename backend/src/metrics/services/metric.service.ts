import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Metric } from '../entities/metric.entity';
import { FilterMetricsDTO } from '../dtos/filter-metric.dtos';
import { Agent } from 'src/agents/entities/agent.entity';
import { MetricResponse } from '../dtos/metric-response';

@Injectable()
export class MetricService {

    private logger = new Logger("MetricService");

    constructor(
        @InjectModel(Metric.name) private metricModel: Model<Metric>,
        @InjectModel(Agent.name) private agentModel: Model<Agent>
    ) { }

    /**
     * Returns every metrics found with the parameters passed
     * @param params 
     * @returns Promise<MetricResponse[]>
     */
    public async findAll(params: FilterMetricsDTO): Promise<MetricResponse[]> {
        const { limit, fromDate, toDate, agentName } = params;
        const filter: FilterQuery<Metric> = {};
        this.logger.log(`Getting metrics that accomplish with the parameters ${params}`)
        if (fromDate && toDate) {
            filter.createdAt = {
                $gte: fromDate,
                $lt: toDate
            }
        }

        if (agentName) {
            const agent: Agent = await this.agentModel.findOne({ name: agentName });
            if (agent)
                filter.agent = agent?._id;
            else return []
        }

        return await this.metricModel
            .find(filter)
            .sort({ createdAt: -1 })
            .limit(limit)
            .exec();
    }

}
