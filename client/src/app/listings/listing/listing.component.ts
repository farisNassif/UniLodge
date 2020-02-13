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
  base64textString: any | ArrayBuffer = "https://placehold.it/150x80?text=IMAGE";
  uploadedImage: any = [];
  userImage: any = [];
  imageStatus: string = '';
  constructor(private listingService: ListingService) { }

  ngOnInit() {
  }


  // Default model before anything is insert via the form
  model = new Listing(  
  null,
  this.Seller,
  this.Location[0],
  null,
  null,
  null);

  // False until submit is selected
  submitted = false;

  onSubmit() { this.submitted = true; }
  
  // Selected from the list, craughwell, loughrea etc
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
      this.base64textString);
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
    if (this.base64textString!= "https://placehold.it/150x80?text=IMAGE")
    {
      this.imageStatus = "Image Saved - You may still change this before you submit your Listing";
    }
    
    console.log(this.base64textString)
  }

}
