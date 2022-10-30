import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class EducationDegreeApiService {
  constructor(private http:HttpClient) { }

  getEducationDegreeList():Observable<any[]> {
    return this.http.get<any>(Constants.apiRoot + '/EducationDegrees');
  }
  
  addEducationDegree(data:any) {
    return this.http.post<any>(Constants.apiRoot + '/EducationDegrees', data);
  }

  updateEducationDegree(id:number | string, data:any) {
    return this.http.put<any>(Constants.apiRoot + `/EducationDegrees/${id}`, data);
  }

  getEducationDegree(id:number | string) {
    return this.http.get<any>(Constants.apiRoot + `/EducationDegrees/${id}`);
  }

  getNumberPages():Observable<any[]> {
    return this.http.get<any>(Constants.apiRoot + '/EducationDegrees/pagenumber');
  }

  getEducationDegreeByPageSorted(sortOrder:string, pageNumber:number, pageSize:number):Observable<any[]> {
    return this.http.post<any>(Constants.apiRoot + `/EducationDegrees/${pageNumber}?sortOrder=${sortOrder}&pageSize=${pageSize}`, sortOrder);
  }

  deleteEducationDegree(id: number | string) {
    return this.http.delete<any>(Constants.apiRoot + `/EducationDegrees/${id}`);
  }
}