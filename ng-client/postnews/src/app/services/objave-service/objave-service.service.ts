import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DBResponse } from '../../models/DBResponse';
import { objavaURL } from '../../config/config';
import { response } from 'express';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjaveServiceService {

  constructor(private httpClient:HttpClient) { }

  getObjave(tags:string[]):Observable<DBResponse>{
    let formBody = new URLSearchParams();
    formBody.append('tags',JSON.stringify(tags));
    return this.httpClient.post<DBResponse>(
      environment.serverApi+'objava'+'?tags=true',
      formBody,
      {
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }
    );
  }

  likeObjava(email:string,oid:string) : Observable<{oid:string,likes:string[]}>{
    return this.httpClient.post<{oid:string,likes:string[]}>(environment.serverApi+'like?email='+email+'&oid='+oid,null);
  }
}
