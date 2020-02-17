import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Listing } from './listing';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ListingService {

  private userUrl = 'http://localhost:5000'; 

  constructor(private http: HttpClient) { }
  
  /** GET listings from the DB test */
  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.userUrl + '/api/listings');
  }

  /** Posts a listing **/
  newListing(username: string, listing: any): Observable<any> {
    return this.http.post<any>(this.userUrl + '/api/new-listing/' + username, listing)
  }  
}