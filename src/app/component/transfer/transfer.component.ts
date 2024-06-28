import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/common/account';
import { TransferForm } from 'src/app/common/transfer-form';
import { User } from 'src/app/common/user';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent implements OnInit {
  accounts: Account[] = []
  transferForm: TransferForm
  amountToCurrency: string
  accountFrom: Account
  accountTo: Account
  user: User

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private userService: UserService
  ) {
    this.transferForm = new TransferForm();
  }

  ngOnInit(): void {
    this.userService.getUser()
    .subscribe(user => this.user = user);
    this.accountService.getAccountsFromUser2()
    .subscribe(accounts => this.accounts = accounts);

  }

  onSubmit() {
    this.transferForm.accountIdFrom = this.accountFrom.id;
    this.transferForm.accountIdTo = this.accountTo.id;
    this.transactionService.transferMoney(this.transferForm).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      }
    );

  }

  accountsAreSame(): boolean {
    if (this.accountFrom != undefined && this.accountTo != undefined) {
      if (this.accountFrom == this.accountTo)
        return true;
    }
    return false;
  }

  accountBalanceInsufficient(): boolean {
    if (this.accountFrom != undefined) {
      if (this.accountFrom.accountBalance < this.transferForm.amountToTransfer )
        return true;
    }
    return false;
  }

  submit() {
    console.log(this.transferForm);
    console.log(this.transferForm.accountIdTo);
    console.log(this.transferForm.amountToTransfer);
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
