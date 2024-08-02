import { Body, Controller, Param, Post, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { ObjavaService } from './objava.service';
import { CreateObjavaDto } from './dto/create-objava.dto';

@Controller('objava')
export class ObjavaController {

    constructor(private objavaService:ObjavaService){

    }

    @Post(':userId')
    @UsePipes(new ValidationPipe())
    createObjava(@Body()createObjavaDto:CreateObjavaDto,@Param('userId')userId:string){
        return this.objavaService.createObjava(createObjavaDto,userId);
    }

    @Get()
    getAllObjave(){
        return this.objavaService.getAllObjave();
    }
}
