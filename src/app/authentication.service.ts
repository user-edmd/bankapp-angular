import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  setUserRole(token: any): void {
    token.idToken.claims.Groups.includes("Admin") ? localStorage.setItem("ROLE", "ADMIN") : localStorage.setItem("ROLE", "USER");
    localStorage.setItem("EMAIL", token.idToken.claims.email);
    localStorage.setItem("NAME", token.idToken.claims.name);

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
