import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  user: any;
  users: User[] = [];
  constructor(private userService: UserService,private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((success: any) => {
      console.log(success)
      this.user = success;      
    });
    this.getUsers()
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users)
  }
}