import { Injectable } from '@nestjs/common';
import { User } from './users.models';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, UpdateUserDto } from './users.dto';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User) 
    private userModel: typeof User){}
    async createUser( userData: CreateUserDto): Promise<boolean>{
        const createdUser= await this.userModel.create({
            lastName:userData.lastName,
            firstName:userData.firstName,
            email:userData.email,
            phoneNumber:userData.phoneNumber,
            password:userData.password
        });
        if(createdUser){
            return true;
        }
        else{
            return false;
        }
    }
    async findUserById(id:number): Promise<User|null>{
        const foundUser= await this.userModel.findOne({ where:{id:id}, attributes:{exclude:['password']},})
        if(foundUser){
            console.log('Fetched user raw:', foundUser.toJSON());
            return foundUser
        }
        else{
            return null
        }
    }
        async findUserByEmail(email:string): Promise<User|null>{
        const foundUser= await this.userModel.findOne({ where:{email:email},})
        if(foundUser){
            return foundUser
        }
        else{
            return null
        }
    } 
    async findAllUsers(): Promise<User[]|null>{
        const foundUsers= await this.userModel.findAll({
            attributes: {exclude:['password']}
        }
        )
        if(foundUsers){
            return foundUsers
        }
        else{
            return null
        }

    }
    async updateUser(id:number,userUpdate:UpdateUserDto): Promise<boolean>{
        const user_update= await this.userModel.findOne({where:{id:id}})
        if(user_update){
            await user_update.update(userUpdate);
            await user_update.save
            return true
        }
        else{
            return false
        }
    }
    async deleteUser(id:number){
        const user_delete = await this.userModel.findOne({where:{id:id}})
        if (user_delete) {
            await user_delete.destroy();
            return true
        }
        else{
            return false
        }

    }

}
