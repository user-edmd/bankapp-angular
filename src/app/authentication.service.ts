import { Injectable } from '@angular/core';
import OktaAuth from '@okta/okta-auth-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  setUserRole(token: any): void {
    token.idToken.claims.Groups.includes("Admin") ? localStorage.setItem("ROLE", "ADMIN") : localStorage.setItem("ROLE", "USER");
  }

  getUserRole(): string {
    return localStorage.getItem("ROLE") ?? "";
  }

  isUserAdmin(): boolean {
    return localStorage.getItem("ROLE") === "ADMIN" ? true : false;
  }

  isUserRegistered(): boolean {
    return true;
  }
}
