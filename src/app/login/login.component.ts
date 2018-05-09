import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from '../auth/AuthService';
import { JwtAuthentication } from '../core/model';

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
  ) { }

  login(email: string, password: string): void {
    this.jwtAuthentication.email = email;
    this.jwtAuthentication.password = password;

    this.authService.auth(this.jwtAuthentication);
  }

}
