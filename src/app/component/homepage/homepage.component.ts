import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from 'src/app/common/user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user: any;
  users: User[] = [];
  private token$: any;

  constructor(private _oktaAuthStateService: OktaAuthStateService, private router: Router, private authService: AuthenticationService) {  }

  ngOnInit(): void {
    this._oktaAuthStateService.authState$.subscribe((data) => (this.token$ = data));
    if (this.token$.isAuthenticated == true) {
      console.log("Logged In");
      this.authService.setUserRole(this.token$)
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