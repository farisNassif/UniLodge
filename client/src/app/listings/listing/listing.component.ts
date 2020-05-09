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
  /* List of selectable locations */
  Location = ['Athenry', 'Ballybrit', 'Claregalway', 'Craughwell', 'Galway City',
              'Gort','Loughrea', 'Salthill', 'Oranmore'];
  /* Declaration of vars for future use */
  Title: string
  Seller: string = window.location.pathname.substring(9,999);
  UserLocation : any;
  price: number
  ContactNumber: string
  Image?: string
  _id?: number

  /* Required for listing model */
  image: string | ArrayBuffer;
  base64textString: any | ArrayBuffer = "https://placehold.it/270x80?text=IMAGE";
  uploadedImage: any = [];
  userImage: any = [];
  imageStatus: string = '';
  r_gen_id: string;

  constructor(private listingService: ListingService, private router: Router) { }

  /* Default model before anything is insert via the form */
  model = new Listing(
  null,
  null,
  this.Seller,
  null,
  null,
  null,
  null,
  null);

  /* False until submit is selected */
  submitted = false;
  onSubmit() { 
    this.submitted = true; 
  }
  
  /* Selected from the list, Craughwell, Loughrea etc */
  setLocation(location: any) {
    this.UserLocation = location;
  }

  /* Listing object, only need some values passed, rest can be auto included as they're already known values */
  newListing(title: string, price: number, contact_num: string, description: any) {
    let r_gen_id = Math.random().toString(36).substring(1); // Gen random ID
    /* New Listing object */
    this.model = new Listing(  
      r_gen_id.replace('.', ''),
      title,
      this.Seller,
      description,
      this.UserLocation,
      price,
      contact_num,
      this.base64textString);

    /* Ship it off to Flask via the Service method */
    this.listingService.newListing(this.Seller, this.model).subscribe(success=> {  
      this.router.navigate(['accommodation/' + this.model.Unique_Id]);
    });
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

  ngOnInit() {
    if (this.Seller != localStorage.getItem('username')) {
      this.router.navigate(['/home']);
    }
  }
}
