import { Component, OnInit } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';

// Required for autocomplete element
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-browse-listings',
  templateUrl: './browse-listings.component.html',
  styleUrls: ['./browse-listings.component.css']
})
export class BrowseListingsComponent implements OnInit {
  /** Gets all the listings from mongo/python and stores them */
  listings: Listing[] = [];

  /** Below attributes required for autocomplete functionality */ 
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  selected: string;
  options: string[] = ['Loughrea', 'Galway City', 'Craughwell', 'Claregalway', 'Athenry', 'Tuam', 'Gort', 'Ballybrit'];
  subject_: string;

  searchRes: any;
  listingsAmt: any;

  constructor(private listingService: ListingService, private router: Router) { }

  ngOnInit() {
    // Autocomplete pipe function
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    // When the page loads just go get all the listings from the backend and populate the listings array
    this.getListings();
  }


  // When submit is pressed, query the backend for relative params
  async searchListings(event: void, location:string) {
    // Get the actual results returned
    this.listingService.getListingByLocation(location).subscribe(listings => this.listings = listings);

    // Get the amount of results returned
    this.listingService.getListingByLocation(location).subscribe(success => {this.searchRes = "Query Returned (" + this.listings.length + ") Results"});
   
  }

  // Clears the page back to its original state
  async clearSearch() {
    this.searchRes = ''
    this.selected = ''
    this.getListings();
  }

  // Required for displaying listings
  getListings(): void {
    this.listingService.getListings().subscribe(listings => this.listings = listings);
    this.listingService.getListings().subscribe(success => { this.listingsAmt = this.getListings.length });
  }
   
  // Redirects to the individual user profile when clicked
  public accommodationRedirect(number : number) {
    this.router.navigate(['/accommodation/' + number]);
  }

  // Methods for enabling autocomplete
  displayAutocomplete(subject) {
    return subject ? subject.name : undefined;
  }

  // Filters the string for autocompleting it 
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    
    // It wont start to auto suggest locations until at least 1 letter has been typed
    if (filterValue.length >= 1) {
      return this.options.filter(option => option.toLowerCase().includes(filterValue))
    }
  }
}
