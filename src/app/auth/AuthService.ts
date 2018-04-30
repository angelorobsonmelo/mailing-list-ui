import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response } from "@angular/http";
import { LoginService } from '../login/login.service';
import { JwtAuthentication } from '../core/model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorage } from '../core/token.storage';

const helper = new JwtHelperService();
const tokenStorage = new TokenStorage();

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private http: Http, private loginService: LoginService) {
  }

  auth(jwtAuthentication: JwtAuthentication): boolean {
    this.loginService.login(jwtAuthentication).subscribe(response => {
      let token = response.json().data.token;
      let decodedToken = helper.decodeToken(token);

      tokenStorage.saveRawToken(token);
      tokenStorage.saveDecodedToken(decodedToken);

      this.loggedIn.next(true);
      this.router.navigate(['/contacts']);
    },
      error => {
        console.log(error.json());
        let exception = error.json().exception;
        var re = "BadCredentialsException";
        if (exception.search(re) == -1) {
          console.log(exception);
        } else {
          console.log("email or password invalid");
        }
      }

    );

    return false;
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
