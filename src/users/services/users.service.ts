import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import UserEntity from '../entitiy/user.entity';

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
}
