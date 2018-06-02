import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from '../auth/AuthService';
import { JwtAuthentication } from '../core/model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  jwtAuthentication = new JwtAuthentication();
  hide = true;

  ngOnInit() {
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(email: string, password: string): void {
    this.jwtAuthentication.email = email;
    this.jwtAuthentication.password = password;

    this.authService.login(this.jwtAuthentication)
    .then(() => {
      this.router.navigate(['/contacts']);
    })
    .catch(erro => {
      alert("usuário ou senha inválida");
      console.log(erro);
    });
  }

}
