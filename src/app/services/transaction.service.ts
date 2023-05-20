import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Transaction } from '../common/transaction';
import { TransactionResponse } from '../common/TransactionResponse';
import { TransferForm } from '../common/transfer-form';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getTransactions(accountId: number, size: number, page: number): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>(`${this.baseUrl}/account/${accountId}/transactions?size=${size}&page=${page}&sort=date,desc`)
    } 

  getTransaction(transactionId: number): Observable<Transaction>{
    return this.http.get<Transaction>(`${this.baseUrl}/transaction/${transactionId}`);
  }

  addTransaction(transaction: Transaction, accountId: number): Observable<Transaction>{
    return this.http.post<Transaction>(`${this.baseUrl}/account/${accountId}/transactions`, transaction);
  }

  transferMoney(transferForm: TransferForm): Observable<TransferForm>{
    return this.http.post<TransferForm>(`${this.baseUrl}/transactions/transferMoney`, transferForm);
  }
}