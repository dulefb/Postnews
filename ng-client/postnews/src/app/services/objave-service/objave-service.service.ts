import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DBResponse } from '../../models/DBResponse';
import { objavaURL } from '../../config/config';
import { response } from 'express';
import { environment } from '../../../environment/environment';
import { Objava } from '../../models/Objava';
import { env } from 'process';
import { text } from 'stream/consumers';
import { Comment } from '../../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class ObjaveServiceService {

  constructor(private httpClient:HttpClient) { }

  getObjave(tags:string[]):Observable<DBResponse>{
    let encodedArray = encodeURIComponent(JSON.stringify(tags));
    return this.httpClient.get<DBResponse>(environment.serverApi+'objava'+'/tags/'+encodedArray);
  }

  likeObjava(email:string,oid:string) : Observable<DBResponse>{
    return this.httpClient.post<DBResponse>(environment.serverApi+'objava/'+'like/'+email+'/'+oid,null);
  }

  dislikeObjava(email:string,oid:string) : Observable<DBResponse>{
    return this.httpClient.post<DBResponse>(environment.serverApi+'objava/'+'dislike/'+email+'/'+oid,null);
  }

  getObjaveFromUser(email:string) : Observable<DBResponse>{
    return this.httpClient.get<DBResponse>(environment.serverApi+'objava/email/'+email);
  }

  postObjava(objava:Objava,email:string) : Observable<DBResponse>{
    return this.httpClient.post<DBResponse>(environment.serverApi+'objava/'+email,objava);
  }

  deleteObjava(oid:string) : Observable<DBResponse>{
    return this.httpClient.delete<DBResponse>(environment.serverApi+'objava/'+oid);
  }

  changeObjava(objava:Objava) : Observable<DBResponse>{
    const updatedObjava = {
      _id:objava._id,
      name:objava.name,
      text:objava.text,
      picture:objava.picture,
      tags:objava.tags
    }
    return this.httpClient.put<DBResponse>(environment.serverApi+'objava',updatedObjava);
  }

  querySearchObjave(search:string) : Observable<DBResponse>{
    let searchEncoded = encodeURIComponent(search);
    return this.httpClient.get<DBResponse>(environment.serverApi+'objava/search/'+searchEncoded);
  }

  postCommentOnObjava(objavaId:string,comment:Comment){
    return this.httpClient.post<DBResponse>(environment.serverApi+'objava/comment/'+objavaId,comment);
  }

  deleteCommentOnObjava(objavaId:string,commentId:string){
    return this.httpClient.delete<DBResponse>(environment.serverApi+'objava/comment/'+objavaId+'/'+commentId);
  }
}
