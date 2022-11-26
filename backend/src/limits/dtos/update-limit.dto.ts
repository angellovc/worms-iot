import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { string } from "joi";
import { Limit } from "../entities/limit.entity";
import { LimitName } from "../enums/limit-name.enum";


export class UpdateLimitDTO {

    @IsNumber()
    @IsOptional()
    min:number;    

    @IsNumber()
    @IsOptional()
    max:number;    
}