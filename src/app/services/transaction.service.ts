import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Transaction } from '../common/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<GetResponse>(`${this.baseUrl}/transactions/all`).pipe(
    map(response => response.content));
    }

  getTransaction(transactionId: number): Observable<Transaction>{
    return this.http.get<Transaction>(`${this.baseUrl}/transaction/${transactionId}`);
  }
}


interface GetResponse {
    content: Transaction[];
}