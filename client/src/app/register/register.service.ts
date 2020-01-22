import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class RegisterService {
  public userUrl = 'http://localhost:5000';  // URL to REST API

  registrationConfirmation: String
  
  constructor(private http: HttpClient) { }

  register(username_and_password: string): Observable<String> {
    return this.http.post<String>(this.userUrl + '/api/register', username_and_password)
  }
}