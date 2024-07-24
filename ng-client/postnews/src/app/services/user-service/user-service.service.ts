import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DBResponse } from '../../models/DBResponse';
import { objavaURL, usersURL } from '../../config/config';
import { response } from 'express';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient:HttpClient) { }

  getUser(email:string,password:string){
    return this.httpClient.get<DBResponse>(
      usersURL+'?email='+email+'&password='+password
    );
  }

  postUser(user:User){
    let formBody = new URLSearchParams();
    formBody.append('name',user.name);
    formBody.append('lastname',user.lastname);
    formBody.append('email',user.email);
    formBody.append('password',user.password);
    formBody.append('content',JSON.stringify(user.content));
    formBody.append('tags',JSON.stringify(user.tags));
    return this.httpClient.post<DBResponse>(
      usersURL,
      formBody,
      {
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }
    );
  }

  deleteUser(userEmail:string){
    return this.httpClient.delete(usersURL+"?email="+userEmail);
  }
}