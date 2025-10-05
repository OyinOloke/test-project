import { Injectable } from '@nestjs/common';
import { UsersService}  from 'src/users/users.service';
import { CreateUserDto } from 'src/users/users.dto';
import { loginDTO } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtservice: JwtService
    ){}
    
    async SignUp(userData: CreateUserDto): Promise<boolean>{
        const userCreated= await this.userService.createUser(userData);
        if (!userCreated){
            return false
        }
        return true

    }
    async validateUser(verifyData:loginDTO): Promise<any>
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

        const validatePassword= verifyData.password
        if(!user.password){
            response.message=  `Internal server error`
            return response
        }
        const checkPassword=  user.password
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
            response.message=`Ivalid email or password as no match for from databse: ${checkPassword} and provided: ${validatePassword}`
            return response
        }
    }
}
