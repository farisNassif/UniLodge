import { Component, OnInit } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit-listings',
  templateUrl: './edit-listings.component.html',
  styleUrls: ['./edit-listings.component.css']
})
export class EditListingsComponent implements OnInit {
  /* Declaration is a bit messy, haven't time to refactor everything */
  Seller: string
  Title: string
  Listing: string = window.location.pathname.substring(14,999);
  UserLocation : any
  Location = ['Athenry', 'Ballybrit', 'Claregalway', 'Craughwell', 'Galway City',
              'Gort','Loughrea', 'Salthill', 'Oranmore']
  price: number
  ContactNumber: string
  Image?: string
  _id?: number
  listings: Listing[]
  image: string | ArrayBuffer
  base64textString: any | ArrayBuffer = "https://placehold.it/270x80?text=IMAGE";
  uploadedImage: any = []
  userImage: any = []
  imageStatus: string = ''

  /* Constructor with required params */
  constructor(private listingService: ListingService, public snackBar: MatSnackBar, public router: Router) { }

  /* When the page loads, get the listing to be edited */
  ngOnInit() {
    this.getListing()
  }

  /* Selector for submission */
  submitted = false;
  onSubmit() { 
    this.submitted = true; 
  }

  /* Selected from the list, craughwell, loughrea etc */
  setLocation(location: any) {
    this.UserLocation = location;
  }

  /* Default listing model, need to initialize it */
  model = new Listing(
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null);

  /* Second Default listing model, need to initialize it */
  modeld = new Listing(
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null);

  /* Retrieves the specific listing (Based on which listing was viewed by the user) */
  getListing(): void {
    this.listingService.getListingById(this.Listing).subscribe(listings =>{
      this.listings = listings
      if (!this.listings[0] || this.listings[0].Seller != localStorage.getItem('username')) {
        this.router.navigate(['/*']);
      } else {
        this.model = new Listing(
          this.listings[0].Unique_Id,
          this.listings[0].Title,
          this.listings[0].Seller,
          this.listings[0].Description,
          this.listings[0].Location,
          this.listings[0].Price,
          this.listings[0].ContactNumber,
          this.listings[0].Image);
        this.base64textString = this.listings[0].Image
        this.Seller = this.listings[0].Seller
      }
    })
  }

  /* Just updates old values with newly input values */
  updateListing(title: string, price: number, contact_num: string, description: any, location: any) {
    /* Newly updated content */
    this.modeld = new Listing( 
      this.Listing,
      title,
      this.Seller,
      description,
      this.UserLocation,
      price,
      contact_num,
      this.base64textString);

    /* Very dirty but time is of the essence */
    this.listingService.deleteListing(this.Listing).subscribe(success=> {
      this.listingService.newListing(this.Seller, this.modeld).subscribe(success=> {  
        this.router.navigate(['accommodation/' + this.modeld.Unique_Id]);
        this.openSnackBar("Listing Updated Successfully", "Ok")
      });
    })
  }

  /* Listens for any changes made to the file upload space */
  changeListener($event: { target: any; }) : void {
    this.readImage($event.target);
  }

  /* Reads the image provided by the user */
  readImage(inputValue: any): void { 
    /* Files are stored as an array object */
    var file: File = inputValue.files[0]; 
    var myReader: FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      /* Saving their chosen image as a String */
      this.base64textString = myReader.result; 
    }
    /* Read the URL data */
    myReader.readAsDataURL(file);
  }

  displayImage() {
    /* If local image was changed from placeholder, success */
    if (this.base64textString!= "https://placehold.it/150x80?text=IMAGE") { 
      /* Just a message for the user letting them know their uploaded image was authorized */
      this.imageStatus = "Image Saved - You may still change this before you submit your Listing";
    }
  }

  /* Reusable method for displaying the snackbar popup for 4.5 seconds */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
        duration: 4500,
    });
  }
}
