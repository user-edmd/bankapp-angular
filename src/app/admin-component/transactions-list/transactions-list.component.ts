import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Transaction } from 'src/app/common/transaction';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.css'
})
export class TransactionsListComponent {
  transactions: Transaction[] = [];
  pageIndex: number;
  size: number;
  totalElements: number;
  currentPage = 0;
  displayedColumns = ['id', 'date', 'type', 'amount', 'actions']
  dataSource: any;

  handlePageEvent(pageEvent: PageEvent) {
    this.transactionService.getAllTransactions(pageEvent.pageSize, pageEvent.pageIndex).subscribe(({content, page}) => {
      pageEvent.pageIndex = page.number;
      pageEvent.pageSize = page.size;
      pageEvent.length = page.totalElements;
      this.totalElements = page.totalElements;
      this.transactions = content;
      this.dataSource = content;
    });
  }

  constructor(private transactionService: TransactionService, private http: HttpClient) { }

  ngOnInit(): void {
    this.size = 10;
    this.transactionService.getAllTransactions(this.size, this.pageIndex).subscribe(({content, page}) => {
      this.pageIndex = page.number;
      this.size = page.size;
      this.totalElements = page.totalElements
      this.transactions = content;
      this.dataSource = content;
    });
  }
}
