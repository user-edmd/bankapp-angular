import { Component, OnChanges, OnInit, SimpleChanges, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import { Account } from 'src/app/common/account';
import { Transaction } from 'src/app/common/transaction';
import { User } from 'src/app/common/user';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: User | undefined;
  accounts?: Account[] | undefined
  transactions: Transaction[] = []
  fullName: string;

  page: number = 0;
  size: number = 8;
  total: number = 0;
  accId: number = 0;

  readonly panelOpenState = signal(false);
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private accountService: AccountService,
    private transactionService : TransactionService,
    private _oktaAuthStateService: OktaAuthStateService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getAccounts();
    this.fullName = localStorage.getItem("NAME") ?? '';
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  openTransactionsPage(): void {
    console.log('open account', this.accId)
    this.router.navigateByUrl(`/account/${this.accId}/addTransaction`);
  }

  getAccounts(): void {
    this.accountService.getAccountsFromUser2()
      .subscribe(accounts => this.accounts = accounts)
  }

  getTotalAccountBalance(): any {
    const sum = this.accounts?.filter(account => account.accountBalance)
    .reduce((sum, current) => sum + current.accountBalance, 0)

    return sum;
  }

  openTransactions(accountId : number) {
    console.log(accountId)
    this.transactionService.getTransactions(accountId, 5, 0)
    
  }

  getTransactions2(accountId: number, page: number) {
    this.accId = accountId;
    this.transactionService.getTransactions(accountId, this.size, page).subscribe(({content, page}) => {
      this.total = page.totalPages;
      this.page = page.number;
      this.transactions = content;
    });
  }

  goToPage(pageSelected: number) {
    if (this.page !== pageSelected)
      this.getTransactions2(this.accId, pageSelected);
  }

  goToPrevOrNext(buttonSelected: string) {
      if (buttonSelected === 'prev') {
        if (this.page - 1 >= 0) {
          this.page--
          this.getTransactions2(this.accId, this.page);
        }
      } else if (buttonSelected === 'next') {
        if (this.page + 1 < this.total) {
          this.page++
          this.getTransactions2(this.accId, this.page);
        }
      }
      
  }

}