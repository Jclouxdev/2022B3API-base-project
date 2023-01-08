import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { isUUID, IsUUID } from 'class-validator';
import { ExtractJwt } from 'passport-jwt';
import { CreateUserDto } from '../dto/create-user.dto';
import UserEntity from '../user.entity';

@Injectable()
export class UsersService {
  async insert(userDetails : CreateUserDto): Promise<Partial<UserEntity>> {
    const userEntity : UserEntity = UserEntity.create(); 
    const { username, password, email, role } = userDetails;
    userEntity.username = username;
    userEntity.password = password;
    userEntity.email = email;
    userEntity.role = role;
    await UserEntity.save(userEntity);
    const { password: savedPassword, ...passwordLessUser } = userEntity;
    return passwordLessUser;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }

  async getUserByMail(email: string): Promise<UserEntity> {
    const getUserByMail = await UserEntity.findOne({
      where: {
        email: email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true
      }
    });
    if (getUserByMail === null) {
      throw new NotFoundException('user does not exist');
    } else {
      return getUserByMail;
    }
  }

  async getUserById(id: string): Promise<UserEntity> {
    if (!isUUID(id)) {
      throw new BadRequestException('bad request')
    }
    const getUserById = await UserEntity.findOne({
      where: {
        id: id,
      },
    });
    if (getUserById === null) {
      throw new NotFoundException('user does not exist');
    } 
    return getUserById;
  }

}
