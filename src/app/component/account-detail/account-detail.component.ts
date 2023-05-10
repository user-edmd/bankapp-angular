import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/common/account';
import { Transaction } from 'src/app/common/transaction';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  account: Account | undefined;
  transactions: Transaction[] = [];
  pages: string[] = [];

  page: number = 0;
  size: number = 10;
  total: number = 0;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private transactionService: TransactionService,
  ) {}

  ngOnInit(): void {
    this.getAccount();
    this.getTransactions(this.page);
  }

  getAccount(): void {
    const routeParams = this.route.snapshot.paramMap;
    const accountIdFromRouter = Number(routeParams.get('id'));
    this.accountService.getAccount(accountIdFromRouter)
      .subscribe(account => this.account = account);
  }

  getTransactions(page: number) {
    const routeParams = this.route.snapshot.paramMap;
    const accountIdFromRouter = Number(routeParams.get('id'));
    this.transactionService.getTransactions(accountIdFromRouter, this.size, page).subscribe(({content, size, number, totalPages}) => {
      this.page = number
      this.size = size
      this.total = totalPages
      this.transactions = content;
    });
  }

  goToPage(pageSelected: number) {
    if (this.page !== pageSelected)
      this.getTransactions(pageSelected);
  }

  goToPrevOrNext(buttonSelected: string) {
      if (buttonSelected === 'prev') {
        if (this.page - 1 >= 0) {
          this.page--
          this.getTransactions(this.page);
        }
      } else if (buttonSelected === 'next') {
        if (this.page + 1 < this.total) {
          this.page++
          this.getTransactions(this.page);
        }
      }
      
  }
}