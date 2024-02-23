import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IdToken } from '@auth0/auth0-angular';
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
  constructor(
    private userService: UserService,
    private authService: AuthService, 
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.authService.idTokenClaims$.subscribe((token: any) => {

      if(token != null) {
        console.log(token)
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${token.__raw}`
          })
        }

        this.http.get<any>('http://localhost:8080/api/user', httpOptions).subscribe(
          (response: UserResponse) => {
            console.log(response.data.id)
            if (response.data == null) {
              this.router.navigate([`/register`])
            } else {
            this.router.navigate([`/users/${response.data.id}`])
            }
          }
        )
      } else {
        console.log('User not logged in!')
      }
    })
    
    // this.getUsers()
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users)
  }

}
export interface UserResponse {
  data: BankingUser
}

export interface BankingUser {
  address: string
  dob: string
  firstName: string
  id: number
  lastName: string
  password: string
  role: string
  ssn: string
  username: string
}