import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../common/user';
import { MultipleUsers } from '../common/multiple-users';
import { SingleUser } from '../common/single-user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = "http://localhost:8080/api/user";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<MultipleUsers>(`${this.baseUrl}/all`).pipe(
      map(response => response.data)
    )
  }

  getUser(userId: number): Observable<User>{
    return this.http.get<SingleUser>(`${this.baseUrl}/${userId}`).pipe(
      map(response => response.data)
    )
  }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  editUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);
  }
}