import { Module } from '@nestjs/common';
import { AgentService } from './services/agent.service';
import { AgentController } from './controllers/agent.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentSchema, Agent } from './entities/agent.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Agent.name,
                schema: AgentSchema
            },
            {
                name: User.name,
                schema: UserSchema
            }
        ])
    ],
    providers: [AgentService],
    controllers: [AgentController],
    exports: [AgentModule]
})
export class AgentModule { }
