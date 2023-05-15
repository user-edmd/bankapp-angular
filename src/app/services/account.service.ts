import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../common/account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]>{
    return this.http.get<Account[]>(`${this.baseUrl}/accounts/all`);
  }

  getAccount(accountId: number): Observable<Account>{
    return this.http.get<Account>(`${this.baseUrl}/account/${accountId}`);
  }

  createAccount(account: Account): Observable<Account>{
    return this.http.post<Account>(`${this.baseUrl}/account`, account);
  }
}
