import { Component, OnInit } from '@angular/core';
import { Listing } from '../listing';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ListingService } from '../listing.service';

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

  image: string | ArrayBuffer;
  base64textString: any | ArrayBuffer;
  uploadedImage: any = [];
  userImage: any = [];

  constructor(private listingService: ListingService) { }

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
    this.listingService.newListing(this.Seller, this.model).subscribe(success=>{ console.log("success?")});
  }

  changeListener($event: { target: any; }) : void {
    this.readImage($event.target);
  }

  readImage(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      // Cuts off the first part of the base64 String, don't need it
      //this.base64textString = (<string>myReader.result).split(',')[1]; 
      this.base64textString = myReader.result; 
    }
    myReader.readAsDataURL(file);
  }

  displayImage() {
    console.log("upload img pls" + this.base64textString)
  }

}
