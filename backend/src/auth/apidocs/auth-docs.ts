import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { BodyLoginDTO } from "../dtos/body-login.dto";
import { ResponseLoginDTO } from '../dtos/response-login.dto';

export const LoginDoc = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Login',
            description: 'Returns a token session that should be sent in the headers everytime a user try to requests for his information'
        }),
        ApiBody({
            type: BodyLoginDTO
        }),
        ApiResponse({
            type: ResponseLoginDTO
        }),
        ApiUnauthorizedResponse({
            description: 'When the password or user are wrong'
        }),
        ApiInternalServerErrorResponse({
            description: 'When there is an unrecoverable server error'
        })
    );
}