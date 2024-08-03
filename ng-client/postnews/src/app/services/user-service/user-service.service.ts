import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DBResponse } from '../../models/DBResponse';
import { objavaURL, usersURL } from '../../config/config';
import { response } from 'express';
import { User } from '../../models/User';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient:HttpClient) { }

  getUser(email:string,password:string){
    return this.httpClient.get<DBResponse>(
      environment.serverApi+'users'+'/'+email+'/'+password
    );
  }

  postUser(user:User){
    return this.httpClient.post<DBResponse>(
      environment.serverApi+'users',
      JSON.stringify(user),
      {
        headers:{
          'Content-Type':'application/json'
        }
      }
    );
  }

  deleteUser(userEmail:string){
    return this.httpClient.delete(environment.serverApi+'users'+"?email="+userEmail);
  }
}