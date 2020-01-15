import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class UserService {

  private userUrl = 'http://localhost:5000';  // URL to REST API

  constructor(private http: HttpClient) { }


  /** GET users from the DB */

  /** GET users from the server */

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/api/users');
  }


  /** Delete a user from the DB */
  removeUser(Username: string) {
    if (confirm("Are you sure to delete?")) {
        return this.http.post<String>('/api/users/remove', Username);
      }
  }
}