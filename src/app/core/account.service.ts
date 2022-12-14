import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';
import { UserProfile } from '../model/user-profile';

@Injectable()
export class AccountService {
    userProfile: UserProfile | undefined;
    constructor(private httpClient: HttpClient) { }
      
    getAllUsers(): Observable<UserProfile[]> {
        return this.httpClient.get<UserProfile[]>(Constants.apiRoot + 'Account/Users');
    }

    createUserProfile(userProfile: UserProfile) {
        return this.httpClient.post(`${Constants.apiRoot}Account/Profile`, userProfile);
    }

    updateUserProfile(userProfile: UserProfile) {
        return this.httpClient.put(`${Constants.apiRoot}Account/Profile/${userProfile.id}`, userProfile);
    }

    register(userInfo: any) {
        return this.httpClient.post(`${Constants.apiRoot}Account/Register`, userInfo);
    }
}