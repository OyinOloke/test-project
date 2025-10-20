import { Controller,Get, Body, Post, Request, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/users.dto';
import { LoginDTO } from './auth.dto';
import{Public} from './auth.metadata'
import * as bcrypt from 'bcrypt'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService ){}
    @Public()
    @Post('signup')
    async createUser(@Body() userData: CreateUserDto){
        const userCreated= await this.authService.SignUp(userData);
        if(userCreated==false){
            return {message: "User creation failed"}
        }
        return {message: "User creation successful", data: userCreated }
    }
    @Public()
    @Post('signin')
    async signIn(@Body()verifyData:LoginDTO): Promise<any>{

        const userValidated= await this.authService.validateUser(verifyData);
        if (!userValidated){
            throw new InternalServerErrorException ('Error fetching user')
        }
        if(userValidated.status== false){
            const error= userValidated.message
            throw new InternalServerErrorException (error)
        }
        return {message: userValidated.message, content: userValidated.token}
    }
}
