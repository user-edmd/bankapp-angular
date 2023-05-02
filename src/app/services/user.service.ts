import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
// export class UserService {

//   private baseUrl = 'http://localhost:8080/user/all'

//   constructor(private httpClient: HttpClient) { }

//   getUserList(): Observable<User[]> {
//     return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
//       map(response => response.user)
//     );
//   }
// }

// interface GetResponse {
//   user: User[];
// }
export class UserService {

  private baseUrl = "http://localhost:8080/user/all";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}`);
  }
}