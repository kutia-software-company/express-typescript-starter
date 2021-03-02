import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength } from 'class-validator'

export class UserCreate {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    public password: string
}