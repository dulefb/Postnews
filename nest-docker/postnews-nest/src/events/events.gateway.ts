import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { ObjavaService } from 'src/objava/objava.service';
import { Server, Socket } from 'socket.io'
import { DBResponse } from 'src/models/DBResponse';

@WebSocketGateway(3001,{
  transports: ['websocket'],
  cors:{
    origin:'*'
  }
})
export class EventsGateway {

  @WebSocketServer()
  server: Server;
  constructor(private objavaService:ObjavaService){

  }

  @SubscribeMessage('events')
  async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload:any) : Promise<WsResponse<DBResponse>>{
    console.log('client',typeof(client));
    const event = 'events';
    const resp = await this.objavaService.getAllObjave();
    return {
      event,
      data:resp
    }
  }

  @SubscribeMessage('objaveEvent')
  async handleObjave(client:any,payload:any){
    
  }
}
