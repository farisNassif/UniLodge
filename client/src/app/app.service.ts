import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

@Injectable()
export class AppService {
    constructor(private http: HttpClient) { }

    home(): Observable<any> {
        return this.http.get<any>('api/home')
    }

    registerUser(username_and_password: string): Observable<String> {
        return this.http.post<String>('api/registerUser', username_and_password)
    }
}   