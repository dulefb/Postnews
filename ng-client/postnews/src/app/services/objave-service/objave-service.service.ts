import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DBResponse } from '../../models/DBResponse';
import { objavaURL } from '../../config/config';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ObjaveServiceService {

  constructor(private httpClient:HttpClient) { }

  getObajve():Observable<DBResponse>{
    return this.httpClient.get<DBResponse>(objavaURL);
  }
}
