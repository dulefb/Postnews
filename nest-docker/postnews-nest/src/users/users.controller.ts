import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private userService:UsersService){}

    @Get()
    getAll(){
        return this.userService.getAllUsers();
    }

    @Get(':email/:password')
    getUserByEmailAndPassword(@Param('email') email:string,@Param('password') password:string){
        return this.userService.getUserByEmailAndPassword(email,password);
    }
    
    @Get(':email')
    getUserByEmail(@Param('email') email:string){
        return this.userService.getUserByEmail(email);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() user:CreateUser){
        return this.userService.createUser(user);
    }

    @Delete(':email')
    deleteUser(@Param('email')email:string){
        return this.userService.deleteUser(email);
    }
}
