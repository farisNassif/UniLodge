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

  /** Pretty much whenever a user profile is loaded get information regarding their previous listings */
  getSingleUserListings(username: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.userUrl + '/api/listings/' + username)
  } 

  /** Return a Single Listing by ID */
  getListingById(unique_id: any): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.userUrl + '/api/listings-id/' + unique_id)
  } 

  /** Finds all listings by params */
  getListingByLocationAndPrice(query: any): Observable<Listing[]> {
    return this.http.post<Listing[]>(this.userUrl + '/api/listings-query/' + query, query)
  }

  /** Posts a listing **/
  newListing(username: string, listing: any): Observable<any> {
    return this.http.post<any>(this.userUrl + '/api/new-listing/' + username, listing)
  }  

  /** Creates a new Comment **/
  newComment(comment_content: any): Observable<any> {
    return this.http.post<any>(this.userUrl + '/api/listings-id/new-comment', comment_content)
  }

  /** Gets all the comments for a specific Listing **/
  getComments(listing_id: any): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.userUrl + '/api/listings-id/comments/' + listing_id);
  }

  
  deleteComment(comment_id: any) {
    if (confirm("Are you sure you want to delete your comment?")) {
      return this.http.delete<any>(this.userUrl + '/api/listings-id/remove-comment/' + comment_id);
    }
  }
}