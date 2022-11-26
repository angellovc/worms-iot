import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ResponseLoginDTO } from "src/auth/dtos/response-login.dto";
import { ResponseUserDTO } from "../dtos/response-user.dto";


export const PostUserDocs = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Post User',
            description: 'Endpoint in charge of retrieving the list of devices that sends information to the server'
        }),
        ApiResponse({
            type: ResponseLoginDTO
        }),
        ApiInternalServerErrorResponse({
            description: 'When there is an unrecoverable server error'
        })
    );
}

export const PatchUserDocs = () => applyDecorators(
    ApiOperation({
        summary: 'Add agent to user',

        description: 'Subscribe the agent passed through to the user who performs the request'
    }),
    ApiBearerAuth('access-token'),
    ApiUnauthorizedResponse({
        description: 'When a non authorized token is sent'
    }),
    ApiCreatedResponse({
        type: ResponseUserDTO
    }),
    ApiNotFoundResponse({
        description: 'A non existing agent is passed through'
    })
);
