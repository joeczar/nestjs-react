import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password!: string;
}

export default RegisterDto;
