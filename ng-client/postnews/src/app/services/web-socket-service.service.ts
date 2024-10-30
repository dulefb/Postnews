import { ApplicationRef, inject, Injectable } from '@angular/core';
import { env } from 'process';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environment/environment';
import { first, Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {
   
  private socket:Socket;
  constructor() {
    this.socket=io(environment.wsServer,{
      autoConnect:false,
      transports:['websocket']
    });
    inject(ApplicationRef).isStable.pipe(
      first((isStable) => isStable))
    .subscribe(() => { this.socket.connect() });
  }

  receiveFeed(message:any){
    this.socket.emit('events',message);
    this.socket.on('events', (res)=>{
      console.log(res);
    });
  }

  connectSocket(){
    this.socket.connect();
  }

  disconnectSocket(){
    this.socket.disconnect();
  }
}
