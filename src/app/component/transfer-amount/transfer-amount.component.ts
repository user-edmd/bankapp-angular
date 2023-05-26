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
  routeParams = this.route.snapshot.paramMap;
  userIdFromRouter = Number(this.routeParams.get('id'));
  amountToCurrency: string

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
    this.accountService.getAccountsFromUser(this.userIdFromRouter)
      .subscribe(accounts => this.accounts = accounts)
  }

  onSubmit() {
    this.transactionService.transferMoney(this.transferForm).subscribe();
    this.router.navigateByUrl(`/user/${this.userIdFromRouter}`).then(() => {
      window.location.reload();
    });
  }
  
  onKeydown(event: any) {
    let amountValue = event.target.value;
      this.amountToCurrency = Number(amountValue).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
  }
}
