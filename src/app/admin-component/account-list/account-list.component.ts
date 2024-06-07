import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Account } from 'src/app/common/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent {
  user: any;
  accounts: Account[] = [];
  pageIndex: number;
  size: number;
  totalElements: number;
  currentPage = 0;

  handlePageEvent(pageEvent: PageEvent) {
    this.accountService.getAccounts(pageEvent.pageSize, pageEvent.pageIndex).subscribe(({content, page}) => {
      pageEvent.pageIndex = page.number;
      pageEvent.pageSize = page.size;
      pageEvent.length = page.totalElements;
      this.totalElements = page.totalElements;
      this.accounts = content;
    });
  }

  constructor(private accountService: AccountService, private http: HttpClient) { }

  ngOnInit(): void {
    this.size = 10;
    this.accountService.getAccounts(this.size, this.pageIndex).subscribe(({content, page}) => {
      this.pageIndex = page.number;
      this.size = page.size;
      this.totalElements = page.totalElements
      this.accounts = content;
    });
  }
}
