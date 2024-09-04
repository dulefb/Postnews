import { Controller, Get, Param, Sse } from '@nestjs/common';
import { SseService } from './sse.service';
import { interval, map, switchMap } from 'rxjs';

@Controller('sse')
export class SseController {

    constructor(private sseService:SseService){

    }

    @Sse('sse/:encodedArray')
    getSseObjave(@Param('encodedArray') encodedArray:string){
        return interval(1500).pipe(
            switchMap(()=>this.sseService.getObjaveByTags(JSON.parse(decodeURIComponent(encodedArray))))
        )
    }

    @Get('testing')
    getSseEvent(){
        return "Hello from sse controller!";
    }
}
