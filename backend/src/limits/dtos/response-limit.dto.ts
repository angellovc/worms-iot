import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Types } from "mongoose";

@ApiTags('DTO')
export class ResponseLimitDTO {
    @ApiProperty({
        type: Types.ObjectId
    })
    _id: Types.ObjectId;
    @ApiProperty({
        type: Types.ObjectId
    })
    openIncident: Types.ObjectId | null;
    @ApiProperty({
        type: Types.ObjectId
    })
    user: Types.ObjectId;
    @ApiProperty({
        type: Number
    })
    max: number;
    @ApiProperty({
        type: Number
    })
    min: number;
    @ApiProperty()
    name: string;
    @ApiProperty({
        type: Types.ObjectId
    })
    agent: Types.ObjectId;
    @ApiProperty({
        type: Date
    })
    createdAt: Date;
    @ApiProperty({
        type: Date
    })
    updatedAt: Date;
    @ApiProperty({
        type: [Types.ObjectId]
    })
    incidents: [Types.ObjectId]
}