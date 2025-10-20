import { IsString, IsNotEmpty, IsEmail } from "class-validator";
export class LoginDTO{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;

}