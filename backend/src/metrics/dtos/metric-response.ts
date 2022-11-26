import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Types } from "mongoose";
import { Agent } from "src/agents/entities/agent.entity";

@ApiTags('DTO')
export class MetricResponse {
    @ApiProperty()
    temperature:number;
    @ApiProperty()
    humidity:number;
    @ApiProperty()
    heatIndex:number;
    @ApiProperty()
    agent:Types.ObjectId|Agent;
}