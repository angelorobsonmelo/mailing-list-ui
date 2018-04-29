import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from '../auth/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  ngOnInit() {
  }

  constructor(
    private authService: AuthService,
  ) { }

  login(username: string, password: string): void {
    this.authService.auth(username, password);
  }

}
