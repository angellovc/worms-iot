import { applyDecorators } from "@nestjs/common"
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { MetricResponse } from "../dtos/metric-response";

export const GetMetricsDoc = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Get Agents',
            description: 'Endpoint in charge of retrieving the list of devices that sends information to the server'
        }),
        ApiUnauthorizedResponse({
            description: 'When a non authorized token is sent'
        }),
        ApiCreatedResponse({
            type: MetricResponse 
        }),
        ApiInternalServerErrorResponse({
            description: 'When there is an unrecoverable server error'
        })
    );
}

