import { Body, Controller, Param, Post, Get, UsePipes, ValidationPipe, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ObjavaService } from './objava.service';
import { CreateObjavaDto } from './dto/create-objava.dto';
import { UpdateObjavaDto } from './dto/update-objava.dto';
import { Comment } from 'src/models/Comment';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';

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

    @Get('/email')
    @UseGuards(JwtAuthGuard)
    getObjaveByUser(@Req() req:any){
        return this.objavaService.getAllObjaveByUser(req.user);
    }

    @Get('/search/:search')
    getObjaveBySearch(@Param('search') search:string){
        const querySearch = decodeURIComponent(search);
        return this.objavaService.getObjaveBySearch(querySearch);
    }

    @Get('/tags/:encodedArray')
    getObjaveByTags(@Param('encodedArray') encodedArray:string){
        return this.objavaService.getObjaveByTags(JSON.parse(decodeURIComponent(encodedArray)));
    }

    @Delete(':id')
    deleteObjavaById(@Param('id') objavaId:string){
        return this.objavaService.deleteObjavaById(objavaId);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    updateObjava(@Body() updateObjava:UpdateObjavaDto){
        return this.objavaService.updateObjava(updateObjava);
    }

    @Post('/like/:email/:objavaId')
    postLikeObjava(@Param('email') email:string, @Param('objavaId') objavaId:string){
        return this.objavaService.likeObjava(email,objavaId);
    }

    @Post('/dislike/:email/:objavaId')
    postDIslikeObjava(@Param('email') email:string, @Param('objavaId') objavaId:string){
        return this.objavaService.dislikeObjava(email,objavaId);
    }

    @Post('/comment/:objavaId')
    postCommentOnObjava(@Body() comment:Comment,@Param('objavaId') objavaId:string){
        return this.objavaService.postCommentOnObjava(objavaId,comment);
    }

    @Delete('/comment/:objavaId/:commentId')
    deleteCommentOnObjava(@Param('objavaId') objavaId:string,@Param('commentId') commentId:string){
        return this.objavaService.deleteCommentOnObjava(objavaId,commentId);
    }

}
