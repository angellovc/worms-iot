import { Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { LoginDoc } from '../apidocs/auth-docs';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {

    private logger = new Logger("AuthController");

    constructor(
        private authService: AuthService
    ) { }

    @LoginDoc()
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(
        @Req() request: Request
    ) {
        const user: User = request.user as User;
        this.logger.log(`loging with user ${user.email}`)
        return this.authService.generateJwt(user);
    }

}
