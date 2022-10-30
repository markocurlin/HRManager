import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthContext } from '../model/auth-context';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthContextApiService {
  constructor(private http:HttpClient) { }

  getAuthContext():Observable<AuthContext> {
    return this.http.get<AuthContext>(Constants.apiRoot + `/Candidates/AuthContext`);
  }
}