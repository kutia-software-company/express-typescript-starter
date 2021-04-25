import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
