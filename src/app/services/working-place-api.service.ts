import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class WorkingPlaceApiService {
  constructor(private http:HttpClient) { }

  getWorkingPlaceList():Observable<any[]> {
    return this.http.get<any>(Constants.apiRoot + '/WorkingPlaces');
  }
  
  addWorkingPlace(data:any) {
    return this.http.post<any>(Constants.apiRoot + '/WorkingPlaces', data);
  }

  updateWorkingPlace(id:number | string, data:any) {
    return this.http.put<any>(Constants.apiRoot + `/WorkingPlaces/${id}`, data);
  }

  getWorkingPlace(id:number | string) {
    return this.http.get<any>(Constants.apiRoot + `/WorkingPlaces/${id}`);
  }

  getWorkingPlacesByCandidate(id: number | string) {
    return this.http.get<any>(Constants.apiRoot + `/WorkingPlaces/list/${id}`);
  }

  getNumberPages():Observable<any[]> {
    return this.http.get<any>(Constants.apiRoot + '/WorkingPlaces/pagenumber');
  }

  getWorkingPlacesByPageSorted(sortOrder:string, pageNumber:number, pageSize:number):Observable<any[]> {
    return this.http.post<any>(Constants.apiRoot + `/WorkingPlaces/${pageNumber}?sortOrder=${sortOrder}&pageSize=${pageSize}`, sortOrder);
  }

  deleteWorkingPlace(id: number | string) {
    return this.http.delete<any>(Constants.apiRoot + `/WorkingPlaces/${id}`);
  }
}