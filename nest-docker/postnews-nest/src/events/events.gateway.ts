import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ObjavaService } from 'src/objava/objava.service';

@WebSocketGateway()
export class EventsGateway {

  constructor(private objavaService:ObjavaService){

  }

  @SubscribeMessage('events')
  handleMessage(client: any, payload: any): any {
    console.log('client',client);
    console.log('payload',payload);
    return this.objavaService.getAllObjave();
  }
}
