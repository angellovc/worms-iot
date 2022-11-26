import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('DTO')
export class BodyLoginDTO {

    @ApiProperty()
    email:string;

    @ApiProperty()
    password:string;
}