import { Component, OnDestroy, OnInit } from '@angular/core';
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
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRouter = Number(routeParams.get('id'));
    this.transaction.accountId = Number(this.route.snapshot.paramMap.get('id'));
    this.transaction.date = this.transactionDate;
    this.transactionService.addTransaction(this.transaction, this.transaction.accountId).subscribe();
    this.router.navigateByUrl(`/user/${userIdFromRouter}`).then(() => {
      window.location.reload();
    });;
  }
}
