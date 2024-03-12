import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/common/account';
import { Transaction } from 'src/app/common/transaction';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent {
  transaction: Transaction;
  transactionDate: Date;
  account: Account
  routeParams = this.route.snapshot.paramMap;
  accountIdFromRouter = Number(this.routeParams.get('id'));
  amountToCurrency: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private accountService: AccountService) {
      this.transaction = new Transaction;
      this.accountService.getAccount(this.accountIdFromRouter)
      .subscribe(account => this.account = account);
  }

  onSubmit() {
    this.transaction.accountId = Number(this.route.snapshot.paramMap.get('id'));
    this.transaction.date = this.transactionDate;
    this.accountService.getAccount(this.accountIdFromRouter).subscribe(account => this.account = account);
    this.transactionService.addTransaction(this.transaction, this.transaction.accountId).subscribe();
    this.router.navigateByUrl(`/users/${this.account.userId}`);
  }

  onKeydown(event: any) {
    let amountValue = event.target.value;
      this.amountToCurrency = Number(amountValue).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
  }
}
