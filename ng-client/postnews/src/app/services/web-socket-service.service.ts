import { Injectable } from '@angular/core';
import { env } from 'process';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environment/environment';
 
@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {
   
  private socket:Socket;
  constructor() {
    this.socket = io(environment.wsServer+'events');

    this.socket.on('events', (res)=>{
      console.log(res);
    });
  }

  receiveFeed(message:any){
    this.socket.emit('events',message);
  }

  disconnectSocket(){
    this.socket.disconnect();
  }
}
