import { ApiProperty, ApiPropertyOptional, ApiTags } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsDefined, IsEmail, IsOptional, IsString, MinLength } from "class-validator";

@ApiTags('DTO')
export class CreateUserDTO {
    @ApiProperty({ required: true })
    @IsDefined({ message: "firstName is required" })
    firstName: string;

    @ApiProperty({ required: true })
    @IsDefined({ message: "lastName is required" })
    lastName: string;

    @ApiProperty({ type: 'email', uniqueItems: true })
    @IsDefined({ message: "email is required" })
    @IsEmail()
    email: string

    @ApiProperty({ required: true })
    @IsDefined({ message: "password is required" })
    @IsString()
    @MinLength(6)
    password: string

    @ApiPropertyOptional({ type: 'array', items: { type: 'string' } })
    @ArrayMinSize(1)
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    agents: string[]
}