import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsOptional, IsString, MinLength } from "class-validator";


export class UpdateUserDTO {

    @ApiPropertyOptional()
    @IsOptional()
    firstName:string;

    @ApiPropertyOptional()
    @IsOptional()
    lastName:string;

    @ApiPropertyOptional({type: 'email', uniqueItems: true})
    @IsOptional()
    @IsEmail()
    email:string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MinLength(6)
    password:string
}