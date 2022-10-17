import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export default class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true, length: 50 })
  username: string;
  
  @Column({ unique: true, length: 100 })
  email: string;
  
  @Column('varchar', { nullable: true })
  role?: 'Employee' | 'Admin' | 'ProjectManager' = 'Employee';

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        throw new InternalServerErrorException('unable to hash password');
      }
    }
  }
}
