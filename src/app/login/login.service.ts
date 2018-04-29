import { environment } from './../../environments/environment';

import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {User} from "../auth/user";

@Injectable()
export class LoginService {

  oauthTokenUrl: string;

  constructor(private http: Http) {
    this.oauthTokenUrl = `${environment.apiUrl}/auth`;
   }

  login(userName: string, password: string): Observable <Response> {
   let body = `"email":"${userName}", "senha":"${password}"`
   
    return this.http.post(this.oauthTokenUrl, JSON.stringify({body}));
  }

}
