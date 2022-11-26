import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ResponseLimitDTO } from "../dtos/response-limit.dto";

export const GetLimitsDoc = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Get Limits from an User',
            description: 'Returns the limits the user sets for every metric type'
        }),
        ApiResponse({
            type: [ResponseLimitDTO]
        }),
        ApiBearerAuth('access-token'),
        ApiUnauthorizedResponse({
            description: 'When a non authorized token is sent'
        }),
        ApiInternalServerErrorResponse({
            description: 'When there is an unrecoverable server error'
        })
    );
}


export const PostLimitDocs = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Post Limit',
            description: 'Creates a new Limit for a specific metric'
        }),
        ApiCreatedResponse({
            type: ResponseLimitDTO
        }),
        ApiBearerAuth('access-token'),
        ApiUnauthorizedResponse({
            description: 'When a non authorized token is sent'
        }),
        ApiInternalServerErrorResponse({
            description: 'When there is an unrecoverable server error'
        })
    );
}

export const PatchLimitDocs = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Patch Limit',
            description: 'Updates an existing Limit for a specific metric'
        }),
        ApiCreatedResponse({
            type: ResponseLimitDTO
        }),
        ApiBearerAuth('access-token'),
        ApiUnauthorizedResponse({
            description: 'When a non authorized token is sent'
        }),
        ApiInternalServerErrorResponse({
            description: 'When there is an unrecoverable server error'
        })
    );
}

export const DeleteLimitDocs = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Delete Limit',
            description: 'Delete an existing Limit for a specific metric'
        }),
        ApiCreatedResponse({
            type: ResponseLimitDTO
        }),
        ApiBearerAuth('access-token'),
        ApiUnauthorizedResponse({
            description: 'When a non authorized token is sent'
        }),
        ApiInternalServerErrorResponse({
            description: 'When there is an unrecoverable server error'
        })
    );
}