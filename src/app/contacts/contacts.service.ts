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

  constructor(public http: HttpClient) { }


  search(filter: ContactFilter, page: number): Observable<Response> {
    const s = new URLSearchParams();

    console.log(filter);

    s.set('pag', page.toString());

    return this.http.post<Response>(`${this.contactsUrl}/filter`, filter);
  }

}
