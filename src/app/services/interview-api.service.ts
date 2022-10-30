import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class InterviewApiService {
  constructor(private http: HttpClient) { }

  getInterviewList():Observable<any[]> {
    return this.http.get<any>(Constants.apiRoot + '/interviews');
  }

  addInterview(data:any):Observable<any[]> {
    return this.http.post<any>(Constants.apiRoot + '/interviews', data);
  }

  updateInterview(id:number | string, data:any) {
    return this.http.put<any>(Constants.apiRoot + `/interviews/${id}`, data);
  }

  getInterview(id: number | string) {
    return this.http.get<any>(Constants.apiRoot + `/interviews/${id}`);
  }

  getNumberPages(id: number | string):Observable<any[]> {
    return this.http.get<any>(Constants.apiRoot + `/interviews/pagenumber?id=${id}`);
  }

  getInterviews(id: number | string) {
    return this.http.get<any>(Constants.apiRoot + `/interviews/list/${id}`);
  }

  getInterviewsByPageSorted(sortOrder: string, pageNumber: number, pageSize: number, id: number):Observable<any[]> {
    return this.http.post<any>(Constants.apiRoot + `/interviews/${pageNumber}?sortOrder=${sortOrder}&pageSize=${pageSize}&id=${id}`, sortOrder);
  }

  deleteInterview(id: number | string) {
    return this.http.delete<any>(Constants.apiRoot + `/interviews/${id}`);
  }
}