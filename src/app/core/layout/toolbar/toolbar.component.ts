import { Router } from '@angular/router';
import { TokenStorage } from './../../token.storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  tokenStorage = new TokenStorage();

  constructor(private router: Router
  ) { }

  ngOnInit() {}

  signOut() {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }

}
