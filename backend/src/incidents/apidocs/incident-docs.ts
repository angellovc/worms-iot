import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ResponseIncidentDTO } from "../dtos/response-incident.dto";

export const GetIncidentsDocs = () => applyDecorators(
    ApiOperation({
        summary: 'Get incidents from an Agent',
        description: 'Returns the amount incidents raised for an Agent'
    }),
    ApiBearerAuth('access-token'),
    ApiUnauthorizedResponse({
        description: 'When a non authorized token is sent'
    }),
    ApiResponse({
        type: ResponseIncidentDTO
    })
);