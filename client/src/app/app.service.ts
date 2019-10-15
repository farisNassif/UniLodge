import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

@Injectable()
export class AppService {
    constructor(private http: HttpClient) { }

    getMessage(): Observable<any> {
        return this.http.get<any>('api/outputMessage')
    }

    registerUser(username): Observable<String> {
        return this.http.post<String>('api/registerUser', username)
    }
}   