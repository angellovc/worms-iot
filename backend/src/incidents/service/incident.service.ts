import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { Limit } from 'src/limits/entities/limit.entity';
import { FilterIncidentDTO } from '../dtos/filter-incident.dto';
import { ResponseIncidentDTO } from '../dtos/response-incident.dto';
import { Incident } from '../entities/incident.entity';

@Injectable()
export class IncidentService {

    private logger = new Logger("IncidentService");

    constructor(
        @InjectModel(Incident.name) private incidentModel: Model<Incident>,
        @InjectModel(Limit.name) private limitModel: Model<Limit>
    ) { }


    /**
     * Creates an incident
     * @param value 
     * @returns Promise<Incident>
     */
    async create(value: number): Promise<Incident> {
        this.logger.log(`Creating a new Incident with value ${value}`);
        const newIncident = new this.incidentModel;
        newIncident.value = value;
        newIncident.openDate = new Date();
        return await newIncident.save();
    }

    /**
     * Returns a list of incidents related to a kind
     * of limit.
     * @param userId 
     * @param params 
     * @returns Promise<ResponseIncidentDTO>
     */
    async findAll(userId: Types.ObjectId, params: FilterIncidentDTO): Promise<ResponseIncidentDTO> {
        const { limit, fromDate, toDate, incidentType } = params;
        this.logger.log(`Searching ${incidentType} incidents for user ${userId}`);
        const pipeline: PipelineStage[] = [
            {
                $match: {
                    $and: [
                        { name: incidentType },
                        { user: userId }
                    ]
                }
            },
            {
                $lookup: {
                    from: "incidents",
                    localField: "incidents",
                    foreignField: "_id",
                    as: "incidents",
                }
            }
        ];

        (fromDate && toDate) && pipeline.push(
            {
                $set: {
                    incidents: {
                        $filter: {
                            input: "$incidents",
                            as: "incidents",
                            cond: {
                                $and: [
                                    { $gte: ["$$incidents.openDate", new Date(fromDate)] },
                                    { $lte: ["$$incidents.openDate", new Date(toDate)] }
                                ]
                            }

                        }
                    },
                }
            }
        )

        pipeline.push(
            {
                $unwind: "$incidents"
            },
            {
                $sort: { 'incidents.openDate': -1 }
            },
            {
                $group: {
                    _id: "$_id",
                    "name": { $first: "$name" },
                    incidents: { $push: "$incidents" }
                }
            }
        )

        limit && pipeline.push(
            {
                $set: {
                    incidents: {
                        $slice: ["$incidents", limit]
                    }
                }
            }
        )

        const limitType: Limit[] = await this.limitModel.aggregate(pipeline);

        if (limitType.length === 0) {
            this.logger.error(`There's no ${incidentType} limits for user ${userId}`);
            throw new NotFoundException(`There's no limit with name ${incidentType}`);
        }
        return limitType[0].toJSON() as ResponseIncidentDTO;
    }

    /**
     * Returns an incident
     * @param incidentId 
     * @returns Promise<Incident>
     */
    async find(incidentId: Types.ObjectId): Promise<Incident> {
        this.logger.log(`Getting the incident ${incidentId}`);
        const incident = this.incidentModel.findOne({ _id: incidentId })
        if (!incident) {
            this.logger.error(`There's no incident with id ${incidentId}`);
            throw new NotFoundException(`There's no incident with id ${incidentId}`);
        }
        return incident;
    }

    /**
     * Closes an existing incident by creating
     * a closeDate insinde it
     * @param incidentId 
     * @returns Promise<Incident>
     */
    async close(incidentId: Types.ObjectId): Promise<Incident> {
        const incident = await this.find(incidentId);
        incident.closeDate = new Date();
        return await incident.save();
    }
}
