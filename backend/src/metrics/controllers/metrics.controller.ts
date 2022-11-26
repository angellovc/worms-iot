import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { FilterMetricsDTO } from '../dtos/filter-metric.dtos';
import { MetricService } from '../services/metric.service';
import { GetMetricsDoc } from '../apidocs/metric-docs';
import { ApiTags } from '@nestjs/swagger';
import { MetricResponse } from '../dtos/metric-response';

@ApiTags('Metric')
@Controller('metric')
export class MetricsController {

    private logger = new Logger("MetricsController");

    constructor(
        private metricService: MetricService
    ) { }

    @GetMetricsDoc()
    @Get()
    public async getMetrics(
        @Query() params: FilterMetricsDTO
    ): Promise<MetricResponse[]> {
        this.logger.log(`Getting metrics with params ${params}`);
        return this.metricService.findAll(params);

    }

}
