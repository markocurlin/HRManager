import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class InterestApiService {
  constructor(private http:HttpClient) { }

  getInterestList():Observable<any[]> {
    return this.http.get<any>(Constants.apiRoot + '/interests');
  }
  
  addInterest(data:any) {
    return this.http.post<any>(Constants.apiRoot + '/interests', data);
  }

  updateInterest(id:number | string, data:any) {
    return this.http.put<any>(Constants.apiRoot + `/interests/${id}`, data);
  }

  getInterest(id:number | string) {
    return this.http.get<any>(Constants.apiRoot + `/interests/${id}`);
  }

  getNumberPages():Observable<any[]> {
    return this.http.get<any>(Constants.apiRoot + '/interests/pagenumber');
  }

  getInterestsByPageSorted(sortOrder:string, pageNumber:number, pageSize:number):Observable<any[]> {
    return this.http.post<any>(Constants.apiRoot + `/interests/${pageNumber}?sortOrder=${sortOrder}&pageSize=${pageSize}`, sortOrder);
  }

  deleteInterest(id: number | string) {
    return this.http.delete<any>(Constants.apiRoot + `/interests/${id}`);
  }
}