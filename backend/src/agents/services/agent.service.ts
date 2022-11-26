import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Agent } from '../entities/agent.entity';

@Injectable()
export class AgentService {

    private logger = new Logger(AgentService.name);


    constructor(
        @InjectModel(Agent.name) private agentModel: Model<Agent>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }


    /**
     * Returns a list of available agents
     * @returns Agent[] 
     */
    async findAll(): Promise<Agent[]> {
        this.logger.log("Getting all agents");
        return await this.agentModel.find().exec();
    }

    /**
     * Return an agent based on the name
     * passed through
     * @param name 
     * @returns Agent
     */
    async find(name: string): Promise<Agent> {
        this.logger.log(`Getting agent ${name}`);
        const agent = await this.agentModel.findOne({ name }).exec();
        if (agent == null) {
            this.logger.error(`agent ${name} does not exists`);
            throw new NotFoundException(`There's no agent with name: ${name}`);
        }
        return agent;
    }

    /**
     * Returns a list of users subscribed to the agent
     * passed through
     * @param agent 
     * @returns User[]
     */
    async findUsers(agent: Agent): Promise<User[]> {
        this.logger.log(`Getting the users subscribed to agent ${agent.name}`);
        const users: User[] = await this.userModel.find({ "agents.id": { $in: agent } });
        return users;
    }

    /**
     * Subscribe a specific user to an agent
     * @param userId 
     * @param agentName 
     * @returns User
     */
    async addAgent(userId: Types.ObjectId, agentName: string): Promise<User> {
        this.logger.log(`Subscribing the user ${userId} to agent ${agentName}`);
        const agent: Agent = await this.find(agentName);
        const user: User = await this.userModel.findOne({ _id: userId });
        user.agents.addToSet(agent);
        return await (await user.save()).populate('agents');
    }

    /**
     * disubscribe an user from an agent
     * @param userId 
     * @param agentName 
     * @returns User
     */
    async removeAgent(userId: Types.ObjectId, agentName: string): Promise<User> {
        this.logger.log(`disubscribing the user ${userId} to agent ${agentName}`);
        const agent: Agent = await this.find(agentName);
        const user: User = await this.userModel.findOne({ _id: userId });
        const include = await user.agents.includes(agent._id);
        if (include === false) {
            this.logger.error(`user ${userId} is not subscribed to agent ${agentName}`);
            throw new NotFoundException(
                `${agentName} is no longer attached to user`,
            );
        }
        user.agents.remove(agent);
        return await (await user.save()).populate('agents');
    }
}
