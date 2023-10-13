import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {User} from '../../model/user.model';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const baseUrl  = 'https://localhost:7038/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  getAll(page: any):Observable<any>{
    return this.httpClient.get<any>(`${baseUrl}user?page=${page}`, page).pipe()
  }

  create(data: any): Observable<any> {
    return this.httpClient.post<any>(`${baseUrl}user`, data).pipe();
  }

  update (id:any, data: any): Observable<any> {
    return this.httpClient.put<any>(`${baseUrl}user/${id}`, data).pipe();
  }
  get(id: any): Observable<User> {
    return this.httpClient.get<User>(`${baseUrl}user/${id}`).pipe();
  }

  getSearch(keyword:any, page:any): Observable<any> {
    return this.httpClient.get<any>(`${baseUrl}user/search?keyword=${keyword}&page=${page}`).pipe();
  }

  getSort (sortBy:any, sortOrder:any, page:any) :Observable<any>{
    return this.httpClient.get<any>(`${baseUrl}user/sort?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}`).pipe();
  }

}

