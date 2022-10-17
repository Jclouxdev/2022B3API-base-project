import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from "../users/users.module";
import { AuthService } from "./services/auth.service";
import { UsersService } from "../users/services/users.service";
import { LocalStrategy } from "./strategies/local.auth";
import { jwtConstants } from "./auth.constants";
import { JwtStrategy } from "./strategies/jwt-auth";


@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  })],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
