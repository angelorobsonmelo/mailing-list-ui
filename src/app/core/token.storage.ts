import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';

const TOKEN_KEY = 'jwtToken';
const DECODED_TOKEN_KEY = 'decodedToken';

@Injectable()
export class TokenStorage {

  constructor() { }

  clearAccessTokenLocalStorage() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(DECODED_TOKEN_KEY);
  }

  public saveRawToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public saveDecodedToken(decodedToken: string) {
    localStorage.setItem(DECODED_TOKEN_KEY, JSON.stringify(decodedToken));
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public getDecodedToken(): string {
    return localStorage.getItem(DECODED_TOKEN_KEY);
  }
}
