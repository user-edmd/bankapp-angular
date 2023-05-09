import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Transaction } from '../common/transaction';
import { TransactionResponse } from '../common/TransactionResponse';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getTransactions(accountId: number, size: number, page: number): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>(`${this.baseUrl}/account/${accountId}/transactions?size=${size}&sort=date,desc&page=${page}`)
    } 

  getTransaction(transactionId: number): Observable<Transaction>{
    return this.http.get<Transaction>(`${this.baseUrl}/transaction/${transactionId}`);
  }
}


interface GetResponse {
    content: Transaction[];
}