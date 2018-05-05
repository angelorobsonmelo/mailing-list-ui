import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

export class ContactFilter {

  gender: string;
  userNameInstagram: string

  category: {
    id: number
  };

  functions: [
    { id: number }
  ];

}

@Injectable()
export class ContactsService {

  contactsUrl = `${environment.apiUrl}/contacts`;

  constructor(public http: HttpClient) {
  }

  search(filter: ContactFilter, page: number, perPage: number): Observable<any> {
    return this.http.post<any>(`${this.contactsUrl}/filter?pag=${page}&perPage=${perPage}`, filter);
  }

}
