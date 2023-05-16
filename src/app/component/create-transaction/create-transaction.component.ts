import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/common/transaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent {
  transaction: Transaction;
  transactionDate: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService) {
      this.transaction = new Transaction;
  }

  onSubmit() {
    this.transaction.accountId = Number(this.route.snapshot.paramMap.get('id'));
    this.transaction.amount = 1000.0
    this.transaction.transactionType = "Deposit"
    this.transaction.date = this.transactionDate
    console.log(this.transaction)
    this.transactionService.addTransaction(this.transaction, this.transaction.accountId).subscribe();

  }
}
