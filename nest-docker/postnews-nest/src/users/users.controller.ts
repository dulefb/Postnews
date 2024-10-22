import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(private userService:UsersService){}

    @Get()
    getAll(){
        return this.userService.getAllUsers();
    }

    @Post(':email/:password')
    @UseGuards(LocalAuthGuard)
    getUserByEmailAndPassword(@Param('email') email:string,@Param('password') password:string,@Req() req:any){
        const user = this.userService.validateUser(email,password);
        return user;
    }
    
    @Get(':email')
    getUserByEmail(@Req() req:Request,@Param('email') email:string){
        return this.userService.getUserByEmail(email);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(LocalAuthGuard)
    createUser(@Body() user:CreateUser){
        return this.userService.createUser(user);
    }

    @Delete(':email')
    deleteUser(@Param('email')email:string){
        return this.userService.deleteUser(email);
    }
}
