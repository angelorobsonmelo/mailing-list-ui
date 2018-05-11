import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { JwtAuthentication } from '../core/model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorage } from '../core/token.storage';
import { Observable } from "rxjs/Observable";
import { environment } from './../../environments/environment';

const helper = new JwtHelperService();
const tokenStorage = new TokenStorage();

@Injectable()
export class AuthService {
  jwtPayload: any;
  oauthTokenUrl: string;

  constructor(private router: Router, private http: Http) {
    this.oauthTokenUrl = `${environment.apiUrl}`;
    this.loadToken();
  }

  login(jwtAuthentication: JwtAuthentication): Promise<void> {
    const body = jwtAuthentication;

    return this.http.post(`${environment.apiUrl}/auth`, body)
      .toPromise()
      .then(response => {
        console.log(response);
        tokenStorage.saveRawToken(response.json().data.token);
        tokenStorage.saveDecodedToken(helper.decodeToken(response.json().data.token));
      })
      .catch(response => {
        const responseJson = response.json();
        if (response.status === 400) {
          if (responseJson.exception === 'invalid_grant') {
            console.log('Usuário ou senha inválida!')
            return Promise.reject('Usuário ou senha inválida!');
          }
        } else if (response.status === 401) {
          if (responseJson.error === 'unauthorized') {
            console.log('unauthorized')
            return Promise.reject('Usuário bloqueado!');
          }
        }  else if (response.status === 401) {
          if (responseJson.exception === 'org.springframework.security.authentication.BadCredentialsException') {
            console.log('Usuário ou senha inválida!')
            return Promise.reject('Usuário bloqueado!');
          }
        }

        return Promise.reject(response);
      });
  }

  isTokenExpired() {
    const token = tokenStorage.getToken();

    return !token || helper.isTokenExpired(token);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getNewAccessToken(): Promise<void> {
    let body = tokenStorage.getToken();

    return this.http.post(`${environment.apiUrl}/refresh`, body)
      .toPromise()
      .then(response => {
        tokenStorage.saveRawToken(response.json().access_token);

        console.log('Novo access token criado!');

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  haveAnyPermission(roles) {
    for (const role of roles) {
      if (this.isAllowed(role)) {
        return true;
      }
    }

    return false;
  }

  isAllowed(role: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(role);
  }

  private loadToken() {
    const token = localStorage.getItem('jtwToken');

    if (token) {
      tokenStorage.saveRawToken(token);
    }
  }

}
