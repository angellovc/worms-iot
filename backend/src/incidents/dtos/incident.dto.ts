import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Types } from "mongoose";

@ApiTags('DTO')
export class IncidentDTO {
    @ApiProperty({
        type: Types.ObjectId
    })
    _id: Types.ObjectId;
    @ApiProperty({ type: Date })
    openDate: Date;
    @ApiProperty({ type: Date })
    closeDate: Date;
    @ApiProperty({ type: Number })
    name: number;
}