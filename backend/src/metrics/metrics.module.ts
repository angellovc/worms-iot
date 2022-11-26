import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Agent, AgentSchema } from 'src/agents/entities/agent.entity';
import { AgentService } from 'src/agents/services/agent.service';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { MetricsController } from './controllers/metrics.controller';
import { Metric, MetricSchema } from './entities/metric.entity';
import { MetricService } from './services/metric.service';

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
            }
        ]),
    ],
    controllers: [MetricsController],
    providers: [MetricService, AgentService],
    exports: [MetricsModule]
})
export class MetricsModule { }
