import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../common/account';
import { Observable, map } from 'rxjs';
import { MultipleAccounts } from '../common/multiple-accounts';
import { AccountResponse } from '../common/account-response';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getAccounts(size: number, page: number): Observable<AccountResponse>{
    return this.http.get<AccountResponse>(`${this.baseUrl}/accounts/all?size=${size}&page=${page}`);
  }

  getAccountsFromUser(userId: number): Observable<Account[]>{
    return this.http.get<MultipleAccounts>(`${this.baseUrl}/account/user/${userId}`).pipe(
      map(response => response.data)
    )
  }

  getAccountsFromUser2(): Observable<Account[]>{
    return this.http.get<Account[]>(`${this.baseUrl}/account/getAccounts`);
  }

  getAccount(accountId: number): Observable<Account>{
    return this.http.get<Account>(`${this.baseUrl}/account/${accountId}`);
  }

  getAccountAdmin(accountId: number): Observable<Account>{
    return this.http.get<Account>(`${this.baseUrl}/account/getAccountById/${accountId}`);
  }

  createAccount(account: Account): Observable<Account>{
    return this.http.post<Account>(`${this.baseUrl}/account`, account);
  }
}
