import { Component, OnInit } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';
/* For the slider */
import { Options, LabelType } from 'ng5-slider';
/* Required for autocomplete element */
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-browse-listings',
  templateUrl: './browse-listings.component.html',
  styleUrls: ['./browse-listings.component.css']
})
export class BrowseListingsComponent implements OnInit {
  /* For the Slider */
  minValue: number = 0;
  maxValue: number = 500;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> €' + value;
        case LabelType.High:
          return '<b>Max price:</b> €' + value;
        default:
          return '€' + value;
      }
    }
  };
  
  /* Gets all the listings from mongo/python and stores them */
  listings: Listing[] = [];
  searched: boolean = false;

  /* Below attributes required for autocomplete functionality */ 
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  selected: string;
  listing_options: string[] = ['Loughrea', 'Galway City', 'Craughwell', 'Claregalway', 'Athenry', 'Tuam', 'Gort', 'Ballybrit'];
  subject_: string;

  searchRes: any;
  listingsAmt: any;

  constructor(private listingService: ListingService, private router: Router) { }

  ngOnInit() {
    /* Autocomplete pipe function for locations */
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    /* When the page loads just go get all the listings from the backend and populate the listings array */
    this.getListings();
  }


  /* When submit is pressed, query the backend for relative params */
  searchListings(event: void, location:string, minVal: number, maxVal: number) {
    this.searched = true
    /* Plan to send the complete query to the backend as JSON */
    let query = { 
      location: location, minVal: minVal, maxVal: maxVal 
    };

    /* Get the actual results returned */
    this.listingService.getListingByLocationAndPrice(query).subscribe(listings => {
      this.listings = listings
      this.searchRes = "Query Returned (" + this.listings.length + ") Results"; 
    });
    
  }

  /* Clears the page back to its original state */
  async clearSearch() {
    this.searchRes = ''
    this.selected = ''
    this.minValue = 0
    this.maxValue = 500
    this.getListings();
  }

  /* Required for displaying listings */
  getListings(): void {
    this.listingService.getListings().subscribe(listings => {
      this.listings = listings, (success => {
        this.listingsAmt = this.getListings.length 
      });
    });

  }
   
  /* Redirects to the individual user profile when clicked */
  public accommodationRedirect(number : number) {
    this.router.navigate(['/accommodation/' + number]);
  }

  /* Methods for enabling autocomplete */
  public displayAutocomplete(subject) {
    return subject ? subject.name : undefined;
  }

  /* Filters the string for autocompleting it */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    
    /* It wont start to auto suggest locations until at least 1 letter has been typed */
    if (filterValue.length >= 1) {
      return this.listing_options.filter(listing_options => listing_options.toLowerCase().includes(filterValue))
    }
  }
}
