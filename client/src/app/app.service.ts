import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

@Injectable()
export class AppService {
    constructor(private http: HttpClient) { }

    getMessage(): Observable<any> {
        return this.http.get<any>('api/outputMessage')
    }

    registerUser(): Observable<any> {
        return this.http.get<any>('api/registerUser')
    }
}   