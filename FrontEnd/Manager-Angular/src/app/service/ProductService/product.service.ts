import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {Product} from '../../model/product.model';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const baseUrl  = 'https://localhost:7038/api/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  getAll(page: any):Observable<any>{
    return this.httpClient.get<any>(`${baseUrl}product?page=${page}`, page).pipe()
  }

  create(data: any): Observable<any> {
    return this.httpClient.post<any>(`${baseUrl}product`, data).pipe();
  }

  update (id:any, data: any): Observable<any> {
    return this.httpClient.put<any>(`${baseUrl}product/${id}`, data).pipe();
  }
  get(id: any): Observable<Product> {
    return this.httpClient.get<Product>(`${baseUrl}product/${id}`).pipe();
  }

  getSearch(keyword:any, page:any): Observable<any> {
    return this.httpClient.get<any>(`${baseUrl}product/search?keyword=${keyword}&page=${page}`).pipe();
  }

  getSort (sortBy:any, sortOrder:any, page:any) :Observable<any>{
    return this.httpClient.get<any>(`${baseUrl}product/sort?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}`).pipe();
  }

}

