import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Agent } from 'src/agents/entities/agent.entity';
import { AgentService } from 'src/agents/services/agent.service';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from '../dtos/update-user.dto';

@Injectable()
export class UserService {

    private logger = new Logger("UserService");

    constructor(
        private agentService: AgentService,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Agent.name) private agentModel: Model<Agent>,
    ) { }

    /**
     * Returns the updated user
     * @param userId 
     * @param body 
     * @returns Promise<User>
     */
    async update(userId: Types.ObjectId, body: UpdateUserDTO): Promise<User> {
        this.logger.log(`updating user ${userId}`);
        const user: User = await this.find(userId);
        user.email !== body.email && await this.validateEmail(body.email);
        Object.assign(user, body);
        if (body.password) {
            user.password = await bcrypt.hash(body.password, 10);
        }
        return await user.save();
    }

    /**
     * Returns the found user
     * @param userId 
     * @returns Promise<User>
     */
    async find(userId: Types.ObjectId): Promise<User> {
        this.logger.log(`Getting the user ${userId}`);
        const user: User = await this.userModel.findOne(userId);
        if (!user) {
            this.logger.error(`there's no user with id ${userId}`);
            throw new NotFoundException(`There's no user with id ${userId} in the database`);
        }
        return user;
    }

    /**
     * Returns the created user
     * @param body 
     * @returns Promise<User>
     */
    async create(body: CreateUserDTO): Promise<User> {
        this.logger.log(`Creating the user`);

        this.logger.log(`Validating if email ${body.email} already exists`);
        await this.validateEmail(body.email);

        const newUser: User = new this.userModel();
        newUser.firstName = body.firstName;
        newUser.lastName = body.lastName;
        newUser.email = body.email;
        newUser.password = await bcrypt.hash(body.password, 10);

        if (body.agents) {
            const agents = await this.getAgentsByName(body.agents);
            newUser.agents.addToSet(...agents);
        }
        const createdUser = await newUser.save();
        return await this.userModel.findOne(createdUser._id).populate('agents');
    }


    /**
     * Returns the user found by its email
     * @param email 
     * @returns Promise<User>
     */
    async findByEmail(email: string): Promise<User> {
        this.logger.log(`Getting user by email ${email}`);
        const user = await (await this.userModel.findOne({ email }))?.populate('agents');
        if (!user) {
            this.logger.log(`There's no user with email ${email}`);
            throw new NotFoundException(`There's no user with email ${email}`);
        }
        return user;
    }

    /**
     * Validate the user password matches with
     * the one passed through
     * @param user 
     * @param password 
     * @returns Promise<boolean>
     */
    async validatePassword(user: User, password: string): Promise<boolean> {
        this.logger.log(`checking the user password for user ${user.id}`);
        if (!user.password)
            user = await this.userModel.findOne(user._id).select('password');
        return await bcrypt.compare(password, user.password);
    }

    /**
     * Validate whether the email exists or not
     * @param email 
     */
    async validateEmail(email: string) {
        this.logger.log(`Validating the email ${email} is available`);
        const user = await this.userModel.findOne({ email });
        if (user) {
            this.logger.error(`Email ${email} is taken`);
            throw new ConflictException(`Email ${email} is already taken`);
        }
    }

    /**
     * Returns a list of agents corresponding to the ones
     * entered as parameter
     * @param agentNames 
     * @returns Promise<Agent[]>
     */
    private async getAgentsByName(agentNames: string[]): Promise<Agent[]> {
        this.logger.log(`Getting agents ${agentNames}`);
        const agents: Agent[] = await this.agentModel.find({
            name: { $in: agentNames },
        });
        if (agents.length !== agentNames.length) {
            const notFoundAgents = [];
            agentNames.forEach((agentName) => {
                !agents.map((agent) => agent.name).includes(agentName) &&
                    notFoundAgents.push(agentName);
            });
            this.logger.error(`Agents ${notFoundAgents} does not exists`);
            throw new NotFoundException(
                `Agents: ${notFoundAgents} were not found`,
            );
        }
        return agents;
    }
}
