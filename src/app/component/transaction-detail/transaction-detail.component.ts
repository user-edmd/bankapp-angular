import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/common/transaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
  transaction: Transaction | undefined;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.getTransaction();
  }

  getTransaction(): void {
    const routeParams = this.route.snapshot.paramMap;
    const transactionIdFromRouter = Number(routeParams.get('id'));
    this.transactionService.getTransaction(transactionIdFromRouter)
      .subscribe(transaction => this.transaction = transaction);
  }
}
