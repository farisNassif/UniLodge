import { Component, OnInit } from '@angular/core';
import { Listing } from '../listing';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  Title: string
  Seller: string = window.location.pathname.substring(9,999);
  UserLocation : any;
  Location = ['Athenry', 'Ballybrit', 'Claregalway', 'Craughwell', 'Galway City',
              'Gort','Loughrea', 'Salthill', 'Oranmore'];
  price: number
  ContactNumber: string
  Image?: string
  _id?: number

  // Required for listing model
  image: string | ArrayBuffer;
  base64textString: any | ArrayBuffer = "https://placehold.it/270x80?text=IMAGE";
  uploadedImage: any = [];
  userImage: any = [];
  imageStatus: string = '';
  r_gen_id: string;

  constructor(private listingService: ListingService, private router: Router) { }

  ngOnInit() {
    // Just testing authorization
    if (this.Seller != localStorage.getItem('username')) {
      this.router.navigate(['/home']);
    }
  }


  // Default model before anything is insert via the form
  model = new Listing(
  null,
  null,
  this.Seller,
  null,
  null,
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

  // Listing object, only need some values passed, rest can be auto included as they're already known values
  newListing(title: string, price: number, contact_num: string, description: any) {
    
    let r_gen_id = Math.random().toString(36).substring(1); // Gen random ID
    this.model = new Listing(  
      r_gen_id.replace('.', ''),
      title,
      this.Seller,
      description,
      this.UserLocation,
      price,
      contact_num,
      this.base64textString);
    console.log(this.model);
    this.listingService.newListing(this.Seller, this.model).subscribe(success=> {  
      this.router.navigate(['accommodation/' + this.model.Unique_Id]);
    });
  }

  // Listens for any changes made to the file upload space
  changeListener($event: { target: any; }) : void {
    this.readImage($event.target);
  }

  // Reads the image provided by the user
  readImage(inputValue: any): void { 
    var file: File = inputValue.files[0]; // Files are stored as an array object
    var myReader: FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.base64textString = myReader.result; // Saving their chosen image as a String
    }
    myReader.readAsDataURL(file); // Read the URL data
  }

  displayImage() {
    // If local image was changed from placeholder, success 
    if (this.base64textString!= "https://placehold.it/150x80?text=IMAGE") { 
      // Just a message for the user letting them know their uploaded image was authorized
      this.imageStatus = "Image Saved - You may still change this before you submit your Listing";
    }
  }

}
