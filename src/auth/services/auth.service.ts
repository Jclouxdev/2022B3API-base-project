import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import UserEntity from '../../users/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }
    async validateUser(email: string, password: string): Promise<UserEntity> {
        const user = await this.usersService.getUserByMail(email);
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && !passwordValid) {
            throw new UnauthorizedException('wrong password');
        }
        return user;

    }

    async login(email:string, password:string) {
        const validatedUser = await this.validateUser(email, password)
        const payload = { email: validatedUser.email, sub: validatedUser.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
