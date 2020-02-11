import { Component, OnInit } from '@angular/core';
import { Listing } from '../listing';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  Location = ['Please choose a Location', 'Loughrea', 'Galway City',
            'Craughwell', 'Ballybrit'];

  model = new Listing(  
  "MyTitle",
  "MySeller",
  this.Location[0],
  5.55,
  "MyNumber",
  "OptionalImage",
  123);

  submitted = false;

  onSubmit() { this.submitted = true; }

  clearForm(form: any) {
      form.reset();
  }
  
  newListing() {
    this.model = new Listing(  
      "",
      "",
      "",
      0,
      "",
      "",
      123);
  }
}
