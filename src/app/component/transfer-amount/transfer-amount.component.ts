import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/common/account';
import { TransferForm } from 'src/app/common/transfer-form';
import { User } from 'src/app/common/user';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transfer-amount',
  templateUrl: './transfer-amount.component.html',
  styleUrls: ['./transfer-amount.component.css']
})
export class TransferAmountComponent {
  accounts: Account[] = []
  transferForm: TransferForm
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {
    this.transferForm = new TransferForm();
  }

  ngOnInit(): void {
    this.getAccounts();
  }
  getAccounts(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRouter = Number(routeParams.get('id'));
    this.accountService.getAccountsFromUser(userIdFromRouter)
      .subscribe(accounts => this.accounts = accounts)
  }

  onSubmit() {
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRouter = Number(routeParams.get('id'));
    console.log('AccId From ' + this.transferForm.accountIdFrom)
    console.log('AccId To ' + this.transferForm.accountIdTo)
    console.log('amount ' + this.transferForm.amountToTransfer)
    this.transactionService.transferMoney(this.transferForm).subscribe();
    this.router.navigateByUrl(`/user/${userIdFromRouter}`).then(() => {
      window.location.reload();
    });;
  }
}
