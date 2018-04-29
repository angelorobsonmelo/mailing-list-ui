import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { JwtAuthentication } from '../core/model';

@Injectable()
export class LoginService {

  oauthTokenUrl: string;

  constructor(private http: Http) {
    this.oauthTokenUrl = `${environment.apiUrl}/auth`;
  }

  login(jwtAuthentication: JwtAuthentication): Observable<Response> {
    return this.http.post(this.oauthTokenUrl, jwtAuthentication);
  }

}
