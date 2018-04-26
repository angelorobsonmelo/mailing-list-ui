import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
  }

  constructor() {
  }

  username : string
  password : string

  login() : void {
    if(this.username == 'admin' && this.password == 'admin'){
    }else {
      alert("Invalid credentials");
    }
  }

}
