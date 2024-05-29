import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users)
  }
}