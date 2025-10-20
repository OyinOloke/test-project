import { Controller, Post, Get,Body,Param, Put, Delete, InternalServerErrorException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto,DeleteUserDto } from './users.dto';
import { Public } from 'src/auth/auth.metadata';

@Controller('users')
export class UsersController {
    constructor(private UsersService:UsersService){}

@Public()    
@Post()
async createUser(@Body() userData: CreateUserDto){
    const userCreated= await this.UsersService.createUser(userData);
    if(!userCreated){
        throw new InternalServerErrorException('failed to create user')
    }
    return {message: "user Succesfully created", content:userCreated
    }
}
@Get(':id')
  async findUser(@Param('userId') userId: string){
    const user= await this.UsersService.findUserById(Number(userId));
    if(!user){
        throw new NotFoundException ("User not found")
    }
    return {message: "User found successfully", content: user}
  }
  @Put(':id')
  async updateUser(@Param('id') id:number, @Body()Updatedata: UpdateUserDto){
    const userUpdated= await this.UsersService.updateUser(id,Updatedata);
    if(!userUpdated){
        throw new NotImplementedException ("Update failed")
    }
    return {message:"User sucesfully updated"}
  }
  @Delete()
    async deleteUser(@Param() userId: DeleteUserDto){
        const userDeleted= await this.UsersService.deleteUser(userId.id);
        if(!userDeleted){
            throw new NotImplementedException ("User could not be deleted")
        }
        return {message: "user sucessfuly deleted"}
    }


}