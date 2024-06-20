import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns = ['date', 'transactionType', 'amount']

  handlePageEvent(pageEvent: PageEvent) {
    this.transactionService.getTransactions(this.account!.id, pageEvent.pageSize, pageEvent.pageIndex).subscribe(({content, page}) => {
      this.dataSource.sort = this.sort;
      pageEvent.pageIndex = page.number;
      pageEvent.pageSize = page.size;
      pageEvent.length = page.totalElements;
      this.totalElements = page.totalElements;
      this.transactions = content;
      this.dataSource = content;
    });
  }

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {    
    const routeParams = this.route.snapshot.paramMap;
    const accountIdFromRouter = Number(routeParams.get('id'));
    this.accountService.getAccountAdmin(accountIdFromRouter)
    .subscribe(account => {
      this.account = account;
      this.userService.getUserById(this.account!.userId).subscribe(
        user => this.user = user);
    });


    this.transactionService.getTransactions(accountIdFromRouter, 10, this.pageIndex).subscribe(({content, page}) => {
      this.dataSource = new MatTableDataSource<Transaction>(content);
      this.dataSource.sort = this.sort;
      this.pageIndex = page.number;
      this.size = page.size;
      this.totalElements = page.totalElements
      this.transactions = content;
      // this.dataSource = content;
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
