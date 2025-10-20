import { IsNotEmpty,IsEmail,IsOptional} from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    lastName:string;
    @IsNotEmpty()
    firstName:string;
    @IsNotEmpty()
    @IsEmail()
    email:string;
    @IsNotEmpty()
    phoneNumber:string;
    @IsNotEmpty()
    password:string;
    @IsOptional()
    @IsNotEmpty()
    isActive:boolean;
}
export class DeleteUserDto{
    @IsNotEmpty()
    id:number;
}
// export class FindUserDto{
//     @IsNotEmpty()
//     id:number;
// }
export class UpdateUserDto{
    @IsOptional()
    @IsNotEmpty()
    lastname?:string;
    @IsOptional()
    @IsNotEmpty()
    firstName?:string;
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email?:string;
    @IsOptional()
    @IsNotEmpty()
    phoneNumber?:string;
    @IsOptional()
    @IsNotEmpty()
    password?:string;
    @IsOptional()
    @IsNotEmpty()
    isActive?:boolean;
}