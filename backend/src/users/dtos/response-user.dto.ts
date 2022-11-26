import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { ResponseAgentDTO } from "src/agents/dtos/response-agent.dto";

ApiTags('DTO')
export class ResponseUserDTO {
    @ApiProperty()
    _id: string;
    @ApiProperty({ type: [ResponseAgentDTO] })
    agents: ResponseAgentDTO[]
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    email: string;
    @ApiProperty({ type: Date })
    createdAt: Date
    @ApiProperty({ type: Date })
    updatedAt: Date
}
