import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DBResponse } from '../../models/DBResponse';
import { objavaURL } from '../../config/config';
import { response } from 'express';
import { environment } from '../../../environment/environment';
import { Objava } from '../../models/Objava';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class ObjaveServiceService {

  constructor(private httpClient:HttpClient) { }

  getObjave(tags:string[]):Observable<DBResponse>{
    let formBody = new URLSearchParams();
    formBody.append('tags',JSON.stringify(tags));
    return this.httpClient.post<DBResponse>(
      environment.serverApi+'objava'+'/tags',
      formBody,
      {
        headers:{
          'Content-Type':'application/json'
        }
      }
    );
  }

  likeObjava(email:string,oid:string) : Observable<DBResponse>{
    return this.httpClient.post<DBResponse>(environment.serverApi+'like/'+email+'/'+oid,null);
  }

  dislikeObjava(email:string,oid:string) : Observable<DBResponse>{
    return this.httpClient.post<DBResponse>(environment.serverApi+'dislike/'+email+'/'+oid,null);
  }

  getObjaveFromUser(email:string) : Observable<DBResponse>{
    return this.httpClient.get<DBResponse>(environment.serverApi+'objava/email/'+email);
  }

  postObjava(objava:Objava,email:string) : Observable<DBResponse>{
    return this.httpClient.post<DBResponse>(environment.serverApi+'objava/'+email,JSON.stringify(objava));
  }

  deleteObjava(oid:string) : Observable<DBResponse>{
    return this.httpClient.delete<DBResponse>(environment.serverApi+'objava/'+oid);
  }

  changeObjava(objava:Objava) : Observable<DBResponse>{
    let formBody = new URLSearchParams();
    formBody.append('id',objava._id);
    formBody.append('name',objava.name);
    formBody.append('text',objava.text);
    formBody.append('picture',objava.picture);
    formBody.append('tags',JSON.stringify(objava.tags));
    formBody.append('likes',JSON.stringify(objava.likes));
    return this.httpClient.put<DBResponse>(environment.serverApi+'objava',formBody);
  }

  querySearchObjave(search:string) : Observable<DBResponse>{
    let searchEncoded = encodeURIComponent(search);
    return this.httpClient.get<DBResponse>(environment.serverApi+'objava?search='+searchEncoded);
  }
}
