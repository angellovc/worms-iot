import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsDateString, isDefined, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsPositive, ValidateIf } from 'class-validator';

@ApiTags('DTO')
export class FilterIncidentDTO {
    @ApiProperty({ required: false })
    @IsDateString()
    @ValidateIf((entity) => entity.fromDate)
    toDate: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @ValidateIf((entity) => entity.toDate)
    fromDate: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    @IsPositive()
    limit: number;

    @ApiProperty({ required: true })
    @IsDefined()
    @IsNotEmpty()
    incidentType: string
}