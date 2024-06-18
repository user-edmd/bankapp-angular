import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/common/account';
import { TransferForm } from 'src/app/common/transfer-form';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent implements OnInit {
  accounts: Account[] = []
  transferForm: TransferForm
  routeParams = this.route.snapshot.paramMap;
  accountIdFromRouter = Number(this.routeParams.get('id'));
  amountToCurrency: string
  accountFrom: Account
  accountTo: Account | undefined

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {
    this.transferForm = new TransferForm();
  }



  ngOnInit(): void {
    this.accountService.getAccount(this.accountIdFromRouter).subscribe
      (account => {
        this.accountFrom = account;
        this.accountService.getAccountsFromUser(this.accountFrom.userId)
          .subscribe(accounts => { this.accounts = accounts })
      });
  }
  // getAccounts(): void {
  //   this.accountService.getAccountsFromUser(this.accountFrom.userId)
  //     .subscribe(accounts => { this.accounts = accounts })
  // }

  onSubmit() {
    this.transactionService.transferMoney(this.transferForm).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      }
    );

  }
  

  onKeydown(event: any) {
    let amountValue = event.target.value;
    this.amountToCurrency = Number(amountValue).toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  }

  userHasMultiAccounts(): boolean {
    return (this.accounts.length >= 2) ? true : false
  }
}