import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { Agent } from 'src/agents/entities/agent.entity';
import { AgentService } from 'src/agents/services/agent.service';
import { CreateLimitDTO } from '../dtos/create-limit.dto';
import { UpdateLimitDTO } from '../dtos/update-limit.dto';
import { Limit } from '../entities/limit.entity';
import { LimitName } from '../enums/limit-name.enum';

@Injectable()
export class LimitService {

    private logger = new Logger("LimitService");

    constructor(
        @InjectModel(Limit.name) private limitModel: Model<Limit>,
        private agentService: AgentService
    ) { }

    /**
     * Returns a list of limits of the user
     * passed through
     * @param user 
     * @returns Promise<Limit[]>
     */
    async findAll(user: Types.ObjectId): Promise<Limit[]> {
        this.logger.log(`Getting limits from user ${user}`);
        return await this.limitModel.find({ user });
    }

    /**
     * Returns a specific limit from a user
     * @param userId 
     * @param limitId 
     * @returns Promise<Limit>
     */
    async find(userId: Types.ObjectId, limitId: Types.ObjectId): Promise<Limit> {
        this.logger.log(`Getting limit ${limitId} from user ${userId}`);
        const limit = await this.limitModel.findOne({ user: userId, _id: limitId });
        if (!limit) {
            this.logger.error(`There's no limit with id ${limitId}`);
            throw new NotFoundException(`Ther's no limit with id ${limitId}`);
        }
        return limit;
    }

    /**
     * Returns the limit find by the name passed through
     * @param userId 
     * @param limitName 
     * @returns Promise<Limit>
     */
    async findByName(userId: Types.ObjectId, limitName: string): Promise<Limit> {
        this.logger.log(`Getting limit ${limitName} from user ${userId}`);
        const limit = await this.limitModel.findOne({ user: userId, name: limitName });
        if (!limit) {
            this.logger.error(`There's no limit with name ${limitName}`);
            throw new NotFoundException(`Ther's no limit of type ${limitName}`);
        }
        return limit;
    }

    /**
     * Returns an updated limit
     * @param userId 
     * @param limitId 
     * @param body 
     * @returns Promise<Limit>
     */
    async update(userId: Types.ObjectId, limitId: Types.ObjectId, body: UpdateLimitDTO): Promise<Limit> {
        this.logger.log(`Updatting limit ${limitId} from user ${userId}`);
        const limit = await this.find(userId, limitId);
        Object.assign(limit, body);
        return await limit.save();
    }

    /**
     * Returns the created limit
     * @param userId 
     * @param body 
     * @returns Promise<Limit>
     */
    async create(userId: Types.ObjectId, body: CreateLimitDTO): Promise<Limit> {
        this.logger.log(`Creating limit ${body} from user ${userId}`);
        await this.validateLimitExist(userId, body.name);
        const agent: Agent = await this.agentService.find(body.agentName);
        const newLimit: Limit = new this.limitModel;
        newLimit.user = userId;
        newLimit.max = body.max;
        newLimit.min = body.min;
        newLimit.name = body.name;
        newLimit.agent = agent.id;
        return await newLimit.save();
    }

    /**
     * Deletes a limit from the DB and returns it
     * @param userId 
     * @param limitId 
     * @returns Promise<Limit>
     */
    async delete(userId: Types.ObjectId, limitId: Types.ObjectId): Promise<Limit> {
        this.logger.log(`Deleting limit ${limitId} from user ${userId}`);
        const limit = await this.find(userId, limitId);
        return await limit.remove();
    }

    /**
     * Check if the user already have a limit with
     * the name passed through. There must be only
     * one type of limit per user.
     * @param userId 
     * @param limitName 
     */
    private async validateLimitExist(userId: Types.ObjectId, limitName: LimitName) {
        this.logger.log(`Checking if limit ${limitName} from user ${userId} already exists`);
        const limit = await this.limitModel.findOne({
            user: userId, name: limitName
        });
        if (limit) {
            this.logger.error(`limit ${limitName} from user ${userId} already exists`);
            throw new ConflictException(`The current user already has a limit for ${limitName}`);
        }
    }
}
