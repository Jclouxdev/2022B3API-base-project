import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
