import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './user';
import {LoginService} from "../login/login.service";
import {Response} from "@angular/http";

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private loginService: LoginService) {
  }

  login(user: User):boolean {
    // this.loginService.logar(user).subscribe((response: Response)=>{
    //   if (response.json().cod_perfil_usuario == 2) {
    //     localStorage.setItem('usuario', response.text());
    //     this.loggedIn.next(true);
    //     this.router.navigate(['/posts']);
    //   }
    // });
    return false;
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('usuario');
    this.router.navigate(['/admin']);
  }

}
