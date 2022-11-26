import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Types } from "mongoose";
import { IncidentDTO } from './incident.dto'

@ApiTags('DTO')
export class ResponseIncidentDTO {
    @ApiProperty({
        type: Types.ObjectId
    })
    _id: Types.ObjectId;
    @ApiProperty()
    name: string;
    @ApiProperty({ type: [IncidentDTO] })
    incidents: [IncidentDTO];
}