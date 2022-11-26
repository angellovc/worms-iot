import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/services/user.service';
import { ResponseLoginDTO } from '../dtos/response-login.dto';

@Injectable()
export class AuthService {

    private logger = new Logger("AuthService")

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    /**
     * Validates the credentials of an user
     * in case the credentials entered are
     * correct, the user is returned
     * @param email 
     * @param password 
     * @returns Promise<User>
     */
    async validateUser(email: string, password: string): Promise<User> {
        this.logger.log(`Checking if user exists with email ${email}`);
        const user = await this.userService.findByEmail(email);
        this.logger.log(`Checking if user password matches`);
        const isCorrectPassword = await this.userService.validatePassword(user, password);
        if (isCorrectPassword) {
            this.logger.log(`Correct authentication for user ${email}`);
            return user;
        }
        this.logger.error(`Incorrect credentials for user ${email}`);
        return null;
    }

    /**
     * Generate the token session for
     * an autheticated user. Returns
     * an usere session
     * @param user 
     * @returns 
     */
    generateJwt(user: User): ResponseLoginDTO {
        this.logger.log(`Generating token session for user ${user.email}`);
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                email: user.email
            }),
            user: user.toJSON()
        }
    }
}

