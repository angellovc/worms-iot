import { Body, Controller, Logger, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Public } from 'src/auth/decorators/public.decorator';
import { ResponseLoginDTO } from 'src/auth/dtos/response-login.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/auth/services/auth.service';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { PatchUserDocs, PostUserDocs } from '../apidocs/user-docs';
import { ResponseUserDTO } from '../dtos/response-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {

    private logger = new Logger("UserController");

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    @PostUserDocs()
    @Public()
    @Post()
    async createUser(
        @Body() body: CreateUserDTO
    ): Promise<ResponseLoginDTO> {
        this.logger.log(`Create user with email ${body.email}`);
        const user = await this.userService.create(body);
        return this.authService.generateJwt(user);
    }

    @PatchUserDocs()
    @Patch()
    async updateUser(
        @Request() request,
        @Body() body: UpdateUserDTO
    ): Promise<ResponseUserDTO> {
        const user: User = request.user as User;
        this.logger.log(`Updating user with ${user.email}`);
        const userId = new Types.ObjectId(user.id)
        return (await this.userService.update(userId, body)).toJSON() as ResponseUserDTO;
    }

}
