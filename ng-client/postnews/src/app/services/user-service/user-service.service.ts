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
      usersURL+'?email='+email+'&password='+password);
  }

  postUser(user:User){
    return this.httpClient.post<DBResponse>(usersURL,user);
  }
}