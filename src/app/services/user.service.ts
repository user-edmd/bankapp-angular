import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = "http://localhost:8080/user";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/all`);
  }

  getUser(userId: number): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  editUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);
  }

}