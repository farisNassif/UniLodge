import { Component, OnInit } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-browse-listings',
  templateUrl: './browse-listings.component.html',
  styleUrls: ['./browse-listings.component.css']
})
export class BrowseListingsComponent implements OnInit {
  listings: Listing[] = [];
  searchLocation: string
  constructor(private listingService: ListingService, private router: Router) { }

  ngOnInit() {
    this.getListings();
  }


  searchListings(): void {
    
  }

  // Required for displaying listings
  getListings(): void {
    this.listingService.getListings().subscribe(listings => this.listings = listings);
  }
   
  // Redirects to the individual user profile when clicked
  public profileRedirect(username : string) {
    this.router.navigate(['/profile/' + username]);
  }
}
