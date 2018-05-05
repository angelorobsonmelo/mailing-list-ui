import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';

const TOKEN_KEY = 'jtwToken';
const DECODED_TOKEN_KEY = 'decodedToken';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    localStorage.clear();
  }

  public saveRawToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public saveDecodedToken(decodedToken: string) {
    localStorage.setItem(DECODED_TOKEN_KEY, JSON.stringify(decodedToken));
  }

  public getToken(): string {
    let token = localStorage.getItem(TOKEN_KEY);
    return token;
  }

  public getDecodedToken(): string {
    return localStorage.getItem(DECODED_TOKEN_KEY);
  }
}
