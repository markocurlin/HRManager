import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private http: HttpClient) { }

  getUserList():Observable<any[]> {
    return this.http.get<any>(Constants.apiRoot + '/Account/');
  }

  addUser(data:any):Observable<any[]> {
    return this.http.post<any>(Constants.apiRoot + '/Account', data);
  }

  addUserIdentity(data:any):Observable<any[]> {
    return this.http.post<any>(Constants.stsAuthority + '/api/Account/register', data);
  }

  updateUser(id:number | string, data:any):Observable<any[]> {
    return this.http.put<any>(Constants.apiRoot + `/Account/${id}`, data);
  }

  updateUserIdentity(id:number | string, data:any):Observable<any[]> {
    return this.http.put<any>(Constants.stsAuthority + `/api/Account/${id}`, data);
  }

  getUser(id: number | string) {
    return this.http.get<any>(Constants.apiRoot + `/Account/${id}`);
  }

  getNumberPages():Observable<any[]> {
    return this.http.get<any>(Constants.apiRoot + '/Account/pagenumber');
  }

  getUsersByPageSorted(sortOrder:string, pageNumber:number, pageSize: number):Observable<any[]> {
    return this.http.post<any>(Constants.apiRoot + `/Account/${pageNumber}?sortOrder=${sortOrder}&pageSize=${pageSize}`, sortOrder);
  }

  deleteUser(id: number | string) {
    return this.http.delete<any>(Constants.apiRoot + `/Account/${id}`);
  }

  deleteUserIdentity(id: number | string) {
    return this.http.delete<any>(Constants.stsAuthority + `/api/Account/${id}`);
  }
}