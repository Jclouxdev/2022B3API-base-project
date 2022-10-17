import { Controller, Request, Post, UseGuards, Body, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login-dto';
import { AuthService } from './services/auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    // @UseGuards(AuthGuard('local'))
    @Post('/users/auth/login')
    async login(@Body(new ValidationPipe({ transform: true, whitelist: true })) loginUser: LoginDto) {
        return this.authService.login(loginUser.email, loginUser.password);
    }
}
