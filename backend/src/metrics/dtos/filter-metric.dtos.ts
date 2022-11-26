import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsPositive, ValidateIf } from 'class-validator';

@ApiTags('DTO')
export class FilterMetricsDTO {
    @ApiProperty({required: false})
    @IsDateString()
    @ValidateIf((entity) => entity.fromDate)
    toDate:string;

    @ApiProperty({required: false})
    @IsDateString()
    @ValidateIf((entity) => entity.toDate)
    fromDate:string;

    @ApiProperty({required: false})
    @IsNumber()
    @IsOptional()
    @IsPositive()
    limit:number;

    @ApiProperty({required: false})
    @IsOptional()
    agentName:string
}