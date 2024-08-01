import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private userService:UsersService){}

    @Get()
    getAll(){
        return this.userService.getAllUsers();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() user:CreateUser){
        return this.userService.createUser(user);
    }
}
