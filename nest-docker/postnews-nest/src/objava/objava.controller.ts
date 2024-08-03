import { Body, Controller, Param, Post, Get, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
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

    @Get('id/:objavaId')
    getObjavaById(@Param('objavaId') objavaId:string){
        return this.objavaService.getObjavaById(objavaId);
    }

    @Get('/email/:email')
    getObjaveByUser(@Param('email') email:string){
        return this.objavaService.getAllObjaveByUser(email);
    }

    @Get('/search/:search')
    getObjaveBySearch(@Param('search') search:string){
        const querySearch = decodeURIComponent(search);
        return this.objavaService.getObjaveBySearch(querySearch);
    }

    @Get('/tags')
    getObjaveByTags(@Body() tags:string[]){
        return this.objavaService.getObjaveByTags(tags);
    }

    @Delete(':id')
    deleteObjavaById(@Param('id') objavaId:string){
        return this.objavaService.deleteObjavaById(objavaId);
    }

}
