import { Body, Controller, Get, Param, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('/')
  findAll() {
    return this.usersServices.getAllUsers();
  }

  @Post('/auth/sign-up')
  createUser(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    user: CreateUserDto,
  ) {
    return this.usersServices.insert(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: string){
    return this.usersServices.getUserById(id);
  }
}
