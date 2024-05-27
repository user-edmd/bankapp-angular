import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
// import { AuthService, IdToken } from '@auth0/auth0-angular';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user: any;
  users: User[] = [];
  private token$: any;

  constructor(private _oktaAuthStateService: OktaAuthStateService, private router: Router) {  }

  ngOnInit(): void {
    this._oktaAuthStateService.authState$.subscribe((data) => (this.token$ = data));
    if (this.token$.isAuthenticated == true) {
      console.log("Logged In");
      // this.authService.isUserAdmin() ? this.router.navigate(['/employees']) : this.router.navigate(['/profile']);
      this.router.navigate(['/dashboard']);
    } else {
      console.log("Not Logged In");
    }
  }

  // getUsers(): void {
  //   this.userService.getUsers().subscribe(users => this.users = users)
  // }

}
// export interface UserResponse {
//   data: BankingUser
// }

// export interface BankingUser {
//   address: string
//   dob: string
//   firstName: string
//   id: number
//   lastName: string
//   password: string
//   role: string
//   ssn: string
//   username: string
// }