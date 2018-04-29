import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Http, Response} from "@angular/http";
import { User } from './user';
import { LoginService } from '../login/login.service';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private http: Http, private loginService: LoginService) {
  }

  auth(username: string, password: string):boolean {
    this.loginService.login(username, password).subscribe( response => {
      localStorage.setItem('user', response.json());
        this.loggedIn.next(true);
        // this.router.navigate(['/posts']);
  },
  error => {
      console.log(error);

  }
    );

    return false;
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('usuario');
    this.router.navigate(['/admin']);
  }

}
