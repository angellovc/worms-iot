import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentModule } from 'src/agents/agent.module';
import { Agent, AgentSchema } from 'src/agents/entities/agent.entity';
import { AgentService } from 'src/agents/services/agent.service';
import { Incident, IncidentSchema } from 'src/incidents/entities/incident.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { LimitController } from './controllers/limit.controller';
import { Limit, LimitSchema } from './entities/limit.entity';
import { LimitService } from './services/limit.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Limit.name,
                schema: LimitSchema
            },
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: Agent.name,
                schema: AgentSchema
            },
            {
                name: Incident.name,
                schema: IncidentSchema
            }
        ]),
        AgentModule
    ],
    providers: [LimitService, AgentService],
    controllers: [LimitController]
})
export class LimitModule { }
