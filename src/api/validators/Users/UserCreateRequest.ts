import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength } from 'class-validator'

export class UserCreateRequest {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string
}