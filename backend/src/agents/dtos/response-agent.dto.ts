import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Types } from "mongoose";

@ApiTags('DTO')
export class ResponseAgentDTO {
    @ApiProperty({
        type: Types.ObjectId
    })
    _id: Types.ObjectId;
    @ApiProperty()
    name: string;
    @ApiProperty()
    createdAt?: Date;
    @ApiProperty()
    updatedAt?: Date;
}