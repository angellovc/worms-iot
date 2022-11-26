import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { ResponseUserDTO } from "src/users/dtos/response-user.dto";

@ApiTags('DTO')
export class ResponseLoginDTO {
    @ApiProperty()
    accessToken: string;

    @ApiProperty({ type: ResponseUserDTO })
    user: ResponseUserDTO;
}