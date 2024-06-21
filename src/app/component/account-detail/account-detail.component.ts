import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/common/account';
import { Transaction } from 'src/app/common/transaction';
import { User } from 'src/app/common/user';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { CreateTransactionComponent } from '../create-transaction/create-transaction.component';
import { TestsortingComponent } from 'src/app/admin-component/testsorting/testsorting.component';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  user: User | undefined;
  account: Account | undefined;
  transactions: Transaction[] | undefined;
  pageIndex: number;
  size: number;
  totalElements: number;
  currentPage = 0;
  dataSource: any;
  displayedColumns = ['date', 'transactionType', 'amount'];

  onRadioButtonChange($event: MatRadioChange) {
    this.account!.accountType = $event.value;
  }
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;

  readonly dialog = inject(MatDialog);

  openDialog() {
    let dialogRef = this.dialog.open(this.callAPIDialog);
  }


  handlePageEvent(pageEvent: PageEvent) {
    this.transactionService.getTransactionsSorted(this.account!.id, pageEvent.pageSize, pageEvent.pageIndex).subscribe(({content, page}) => {
      this.dataSource = new MatTableDataSource(content);
      pageEvent.pageIndex = page.number;
      pageEvent.pageSize = page.size;
      pageEvent.length = page.totalElements;
      this.totalElements = page.totalElements;
      
    });
  }

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {    
    const routeParams = this.route.snapshot.paramMap;
    const accountIdFromRouter = Number(routeParams.get('id'));
    this.accountService.getAccount(accountIdFromRouter)
    .subscribe(account => this.account = account);

    this.transactionService.getTransactionsSorted(accountIdFromRouter, this.size = 10, this.pageIndex).subscribe(({content, page}) => {
      this.dataSource = new MatTableDataSource<Transaction>(content);
      this.pageIndex = page.number;
      this.size = page.size;
      this.totalElements = page.totalElements
    });
  }

  handleEvent(event: boolean) {
    if (event == true) {
      this.ngOnInit();
    }
  }
}
