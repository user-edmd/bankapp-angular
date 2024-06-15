import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/common/account';
import { Transaction } from 'src/app/common/transaction';
import { User } from 'src/app/common/user';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrl: './view-account.component.css'
})
export class ViewAccountComponent implements OnInit{
  user: User | undefined;
  account!: Account | undefined;
  transactions: Transaction[] | undefined;
  pageIndex: number;
  size: number;
  totalElements: number;
  currentPage = 0;
  dataSource: any;
  displayedColumns = ['id', 'date', 'transactionType', 'amount']

  handlePageEvent(pageEvent: PageEvent) {
    this.transactionService.getTransactions(this.account!.id, pageEvent.pageSize, pageEvent.pageIndex).subscribe(({content, page}) => {
      pageEvent.pageIndex = page.number;
      pageEvent.pageSize = page.size;
      pageEvent.length = page.totalElements;
      this.totalElements = page.totalElements;
      this.transactions = content;
      this.dataSource = content;
    });
  }

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {    
    const routeParams = this.route.snapshot.paramMap;
    const accountIdFromRouter = Number(routeParams.get('id'));
    this.accountService.getAccountAdmin(accountIdFromRouter)
    .subscribe(account => this.account = account);

    this.transactionService.getTransactions(accountIdFromRouter, 10, this.pageIndex).subscribe(({content, page}) => {
      this.pageIndex = page.number;
      this.size = page.size;
      this.totalElements = page.totalElements
      this.transactions = content;
      this.dataSource = content;
    });
  }
}
