import { Function, Category } from './../core/model';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CategoryService {

  categoriesUrl = `${environment.apiUrl}/categories`;

  constructor(public http: HttpClient) {
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.categoriesUrl);
  }

  getCategoriesPageable(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.categoriesUrl}?pag=${page}&perPage=${pageSize}`);
  }

  save(category: Category): Observable<any> {
    return this.http.post<any>(this.categoriesUrl, category);
  }

  update(category: Category): Observable<any> {
    return this.http.put<any>(`${this.categoriesUrl}/${category.id}`, category);
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.categoriesUrl}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.categoriesUrl}/${id}`);
  }

}
