import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
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
export class CreateTransactionComponent implements OnInit {
  transaction: Transaction;
  transactionDate: Date;
  account: Account;

  amountToCurrency: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.transaction = new Transaction;
    const routeParams = this.route.snapshot.paramMap;
    const accountIdFromRouter = Number(routeParams.get('id'));
    this.accountService.getAccount(accountIdFromRouter)
    .subscribe(account => this.account = account);
  }

  onRadioButtonChange($event: MatRadioChange) {
    this.transaction.transactionType = $event.value;
  }

  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(this.callAPIDialog);
  }

  onSubmit() {
    this.transaction.accountId = Number(this.route.snapshot.paramMap.get('id'));
    this.transactionService.addTransaction(this.transaction, this.transaction.accountId).subscribe(
      () => {
        this.router.navigate(['/account/',this.account.id]);
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
}
