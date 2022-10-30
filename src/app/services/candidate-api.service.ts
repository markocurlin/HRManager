import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CandidateApiService {
  constructor(private http:HttpClient) { }

  getCandidateList():Observable<any[]> {
    return this.http.get<any>(Constants.apiRoot + '/candidates');
  }
  
  addCandidate(data:any) {
    return this.http.post<any>(Constants.apiRoot + '/candidates', data);
  }

  updateCandidate(id:number | string, data:any) {
    return this.http.put<any>(Constants.apiRoot + `/candidates/${id}`, data);
  }

  getCandiDate(id:number | string) {
    return this.http.get<any>(Constants.apiRoot + `/candidates/${id}`);
  }

  getFile(fileName:string) {
    return this.http.get(Constants.apiRoot + `/candidates/GetFile?fileName=${fileName}`, 
    { responseType: 'blob' });
  }

  deleteCandiDate(id: number | string) {
    return this.http.delete<any>(Constants.apiRoot + `/candidates/${id}`);
  }

  getNumberPages():Observable<any[]> {
    return this.http.get<any>(Constants.apiRoot + '/candidates/pagenumber');
  }

  getCandidatesByPageSorted(sortOrder:string, pageNumber:number, pageSize:number):Observable<any[]> {
    return this.http.post<any>(Constants.apiRoot + `/candidates/${pageNumber}?sortOrder=${sortOrder}&pageSize=${pageSize}`, sortOrder);
  }

  searchCandidates(data:any):Observable<any[]> {
    return this.http.post<any>(Constants.apiRoot + `/candidates/search`, data);
  }
}