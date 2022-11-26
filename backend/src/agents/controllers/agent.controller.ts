import { Controller, Delete, Get, Logger, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { AddAgentToUserDocs, DeleteAgentUserDocs, GetAgentDoc, GetAgentsDoc } from '../apidocs/agent-docs';
import { Agent } from '../entities/agent.entity';
import { AgentService } from '../services/agent.service';

@ApiTags('Agent')
@UseGuards(JwtAuthGuard)
@Controller('agent')
export class AgentController {
    private logger = new Logger('AgentController');

    constructor(
        private agentService: AgentService
    ) { }

    @Public()
    @GetAgentsDoc()
    @Get()
    public async getAgents(): Promise<Agent[]> {
        this.logger.log("Getting all agents");
        return await this.agentService.findAll();
    }

    @Public()
    @GetAgentDoc()
    @Get('/:name')
    public async getAgent(
        @Param('name') name: string
    ): Promise<Agent> {
        this.logger.log(`Getting agent ${name}`);
        return await this.agentService.find(name);
    }

    @AddAgentToUserDocs()
    @Post(':agentName')
    async addAgent(
        @Request() request,
        @Param('agentName') agentName: string
    ): Promise<User> {
        const user: User = request.user as User;
        const userId = new Types.ObjectId(user.id);
        this.logger.log(`Adding agent ${agentName} to user ${user.email}`);
        return await this.agentService.addAgent(userId, agentName);
    }

    @DeleteAgentUserDocs()
    @Delete(':agentName')
    async deleteAgent(
        @Request() request,
        @Param('agentName') agentName: string
    ): Promise<User> {
        const user: User = request.user as User;
        const userId = new Types.ObjectId(user.id);
        this.logger.log(`Deleting agent ${agentName} from user ${user.email}`);
        return await this.agentService.removeAgent(userId, agentName);
    }
}
