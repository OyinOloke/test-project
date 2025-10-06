import { Controller,Get, Body, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/users.dto';
import { loginDTO } from './auth.dto';
import{Public} from './auth.metadata'
import * as bcrypt from 'bcrypt'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService ){}
    @Public()
    @Post('signup')
    async createUser(@Body() userData: CreateUserDto){
        const saltrounds=10
        const hashPassword= await bcrypt.hash(userData.password,saltrounds)
        userData.password= hashPassword
        const userCreated= await this.authService.SignUp(userData);
        if(userCreated){
            return "User created successfully"
        }
        else{
            return "User creation failed"
        }

    }
    @Public()
    @Post('signin')
    async signIn(@Body()verifyData:loginDTO): Promise<any>{
        const response={
        message: 'Invalid email or password',
        error:'',
        token: ''
        }
        const userValidated= await this.authService.validateUser(verifyData);
        if (!userValidated){
            response.error='Error fetching user'
            return response
        }
        if(userValidated.status== false){
            response.error= userValidated.message
            return response
        }
        response.message='User validated successfully'
        response.token= userValidated.token
        return response
    }
}
