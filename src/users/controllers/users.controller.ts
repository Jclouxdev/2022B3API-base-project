import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}
  
  @Get()
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
}
