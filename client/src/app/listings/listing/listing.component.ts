import { Component, OnInit } from '@angular/core';
import { Listing } from '../listing';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  Title: string
  Seller: string = window.location.pathname.substring(9,999);
  UserLocation : any;
  Location = ['Please choose a Location', 'Loughrea', 'Galway City',
            'Craughwell', 'Ballybrit'];
  Price: Number
  ContactNumber: string
  Image?: string
  _id?: number

  constructor() { }

  ngOnInit() {
  }



  model = new Listing(  
  null,
  this.Seller,
  this.Location[0],
  null,
  null,
  null,
  null);

  submitted = false;

  onSubmit() { this.submitted = true; }
  
  setLocation(location: any) {
    console.log(location)
    this.UserLocation = location;
  }

  newListing(title: string, price: string, contact_num: string) {
    var loc = "";
    this.model = new Listing(  
      title,
      this.Seller,
      this.UserLocation,
      price,
      contact_num,
      "Imagebase64 String",
      123);
    console.log(this.model);
  }

  
}
