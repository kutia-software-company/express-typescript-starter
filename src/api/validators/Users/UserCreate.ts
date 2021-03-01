import { IsNotEmpty, IsEmail } from 'class-validator'

export class UserCreate {
    @IsNotEmpty()
    @IsEmail()
    public email: string;
}