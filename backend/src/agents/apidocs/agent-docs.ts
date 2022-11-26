import { applyDecorators } from "@nestjs/common"
import { ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ResponseUserDTO } from "src/users/dtos/response-user.dto";
import { ResponseAgentDTO } from "../dtos/response-agent.dto";

export const GetAgentsDoc = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Get Agents',
            description: 'Endpoint in charge of retrieving the list of devices that sends information to the server'
        }),
        ApiResponse({
            type: ResponseAgentDTO
        }),
        ApiInternalServerErrorResponse({
            description: 'When there is an unrecoverable server error'
        })
    );
}

export const GetAgentDoc = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Get Agent',
            description: 'Endpoint in charge of retrieving the agent by its name'
        }),
        ApiResponse({
            type: ResponseAgentDTO
        }),
        ApiInternalServerErrorResponse({
            description: 'When there is an unrecoverable server error'
        })
    );
}


export const AddAgentToUserDocs = () => applyDecorators(
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


export const DeleteAgentUserDocs = () => applyDecorators(
    ApiOperation({
        summary: 'Delete agent to user',
        description: 'Unsubscribe the agent passed through to the user who performs the request'
    }),
    ApiBearerAuth('access-token'),
    ApiUnauthorizedResponse({
        description: 'When a non authorized token is sent'
    }),
    ApiResponse({
        type: ResponseUserDTO
    }),
    ApiNotFoundResponse({
        description: 'A non existing agent is passed through'
    })
);

