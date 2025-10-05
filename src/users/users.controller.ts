import { Controller, Post, Get,Body,Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, FindUserDto, UpdateUserDto,DeleteUserDto } from './users.dto';
import { User } from './users.models';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
    constructor(private UsersService:UsersService){}

@Post()
async createUser(@Body() userData: CreateUserDto){
    const saltRounds=10;
    const password=userData.password;
    const hash= await bcrypt.hash(password, saltRounds);
    userData.password= hash
    const userCreated= await this.UsersService.createUser(userData);
    if(userCreated){
        return "User created successfully"
    }
    else{
        return "User creation failed"
    }
}
@Get(':id')
  async findUser(@Param('userId') userId: FindUserDto): Promise<User|null> {
    const user= await this.UsersService.findUserById(userId.id);
    if(!user){
        return null
    }
    else{
        return user
    }
  }
  @Put(':id')
  async updateUser(@Param('id') id:number, @Body()Updatedata: UpdateUserDto){
    const userUpdated= await this.UsersService.updateUser(id,Updatedata);
    if(userUpdated){
        return "User updated successfully"
    }
    else{
        return "User update failed"
    }
  }
  @Delete()
    async deleteUser(@Param() userId: DeleteUserDto){
        const userDeleted= await this.UsersService.deleteUser(userId.id);
        if(userDeleted){
            return "User deleted successfully"
        }
        else{
            return "User deletion failed"
        }
    }


}