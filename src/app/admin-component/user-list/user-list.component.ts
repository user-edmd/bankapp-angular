import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
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
  pageIndex: number;
  size: number;
  totalElements: number;
  currentPage = 0;
  dataSource: any;
  displayedColumns = ['id', 'firstName', 'lastName', 'accounts', 'actions']
  isActive = true;

  handlePageEvent(pageEvent: PageEvent) {
    this.userService.getUsers(pageEvent.pageSize, pageEvent.pageIndex).subscribe(({content, page}) => {
      pageEvent.pageIndex = page.number;
      pageEvent.pageSize = page.size;
      pageEvent.length = page.totalElements;
      this.totalElements = page.totalElements;
      this.users = content;
      this.dataSource = this.users;
    });
  }

  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.size = 10;
    this.userService.getUsers(this.size, this.pageIndex).subscribe(({content, page}) => {
      this.pageIndex = page.number;
      this.size = page.size;
      this.totalElements = page.totalElements
      this.users = content;
      this.dataSource = this.users;
    });
  }
}