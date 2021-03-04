import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength } from 'class-validator'

export class UserCreateRequest {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    first_name: string

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    last_name: string

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