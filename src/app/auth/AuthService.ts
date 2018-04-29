import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response } from "@angular/http";
import { LoginService } from '../login/login.service';
import { JwtAuthentication } from '../core/model';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private stringContais: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private http: Http, private loginService: LoginService) {
  }

  auth(jwtAuthentication: JwtAuthentication): boolean {
    this.loginService.login(jwtAuthentication).subscribe(response => {
      let responseServer = response.json();
      let decodedToken = helper.decodeToken(responseServer.data.token);

      localStorage.setItem('token', responseServer.token);
      localStorage.setItem('user', decodedToken);

      this.loggedIn.next(true);

      console.log(decodedToken);

      // this.router.navigate(['/posts']);
    },
      error => {
        console.log(error.json());
        let exception = error.json().exception;
        var re = "BadCredentialsException";
        if (exception.search(re) == -1) {
          console.log("Does not contain Apples");
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
