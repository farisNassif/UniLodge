import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

@Injectable()
export class AppService {
    constructor(private http: HttpClient) { }

    private userUrl = 'http://localhost:5000/';  // URL to REST API
}       