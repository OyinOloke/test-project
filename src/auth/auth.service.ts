import { Injectable } from '@nestjs/common';
import { UsersService}  from 'src/users/users.service';
import { CreateUserDto } from 'src/users/users.dto';
import { LoginDTO } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.models';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtservice: JwtService
    ){}
    
    async SignUp(userData: CreateUserDto): Promise<boolean|User>{
        const saltrounds=10
        const hashPassword= await bcrypt.hash(userData.password,saltrounds)
        userData.password= hashPassword
        const CreatedUser= await this.userService.createUser(userData);
        if (!CreatedUser){
            return false
        }
        return CreatedUser

    }
    async validateUser(verifyData:LoginDTO): Promise<any>
    {
        const response= {
            status:false,
            message:"Validation failed",
            token: ""
        }
        const user= await this.userService.findUserByEmail(verifyData.email)

        if (!user){
            response.message="user not found"
            return response
        }

        if(!user.password){
            response.message=  `Internal server error`
            return response
        }
        const isMatch = await bcrypt.compare(verifyData.password, user.password);
        if(isMatch){
            response.status=true
            response.message="user validated successfully"
            const payload={sub:user.id, email:user.email}
            const access_token= this.jwtservice.sign(payload)
            if(!access_token){
                response.status= false
                response.message="internal server error, token generation failed"
                return response
        }
            response.token= access_token
            return response

        }
        else{
            response.status= false
            response.message=`Ivalid email or password`
            return response
        }
    }
}
