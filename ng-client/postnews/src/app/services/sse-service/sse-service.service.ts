import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { DBResponse } from '../../models/DBResponse';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SseServiceService {

  constructor(private httpClient:HttpClient/*,private eventSource:EventSource, private zone:NgZone*/) { }
  /*
  getEventSource(url: string): EventSource {
    return new EventSource(url);
  }

  connectToSSE(tags:string[]): Observable<DBResponse> {
    let encodedArray = encodeURIComponent(JSON.stringify(tags));
    this.eventSource = this.getEventSource(environment.serverApi+'sse/sse/'+encodedArray);

    return new Observable((subscriber: Subscriber<DBResponse>) => {
        this.eventSource.onerror = error => {
            this.zone.run(() => subscriber.error(error));
        };

        this.eventSource.onmessage = (event)=>{
          const messageData : DBResponse = JSON.parse(event.data)
          subscriber.next(messageData);
        }
    });
  }

  // closeConnectionToSSE(): void {
  //   if (!this.eventSource) {
  //       return;
  //   }

  //   this.eventSource.close();
  // }
  */
}
