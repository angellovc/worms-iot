import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsEnum, IsNumber, IsString } from "class-validator";
import { string } from "joi";
import { Limit } from "../entities/limit.entity";
import { LimitName } from "../enums/limit-name.enum";


export class CreateLimitDTO {

    @IsString()
    @IsDefined({message: 'agentName should be present'})
    agentName:string;

    @ApiProperty({
        description: 'List of enums',
        type: string,
        enum: LimitName
    })
    @IsEnum(LimitName, {message: `name should be one of the following values: ${Object.values(LimitName)}`})
    name:LimitName;

    @IsNumber()
    @IsDefined({message: 'min must be present'})
    min:number;    

    @IsNumber()
    @IsDefined({message: 'max must be present'})
    max:number;    
}