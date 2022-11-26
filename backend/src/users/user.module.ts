import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { AgentModule } from 'src/agents/agent.module';
import { Agent, AgentSchema } from 'src/agents/entities/agent.entity';
import { AgentService } from 'src/agents/services/agent.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/services/auth.service';
import { UserController } from './controller/user.controller';
import { User, UserSchema } from './entities/user.entity';
import { UserService } from './services/user.service';

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
        ]),
        AgentModule
    ],
  controllers: [UserController],
  providers: [UserService, AgentService, AuthService],
  exports: [UserService]
})
export class UserModule {}
