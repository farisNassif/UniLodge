import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user'
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { Router, } from "@angular/router";
import { AppComponent } from 'src/app/app.component';
import { ListingService } from 'src/app/listings/listing.service';
import { Listing } from 'src/app/listings/listing';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Obtains the username
  username: string = window.location.pathname.substring(9,40);

  users: User[] = [];
  /* All listings associated with the user */
  listings: Listing[] = []

  uploadedImage: any = [];
  userImage: any = [];

  public base64textString: any | ArrayBuffer = "https://placehold.it/500x500?text=IMAGE";

  constructor(private route: ActivatedRoute, private userService: UserService,
  private location: Location, private listingService: ListingService, public snackBar: MatSnackBar, public router: Router) {}
  
  ngOnInit() {
    this.getUser();
    this.getListingInfo(this.username);
    this.getListingInfo(this.username);
    console.log(this.listings)
  }

  // Gets the individual user information for which the profile is relevant
  getUser(): void {
		this.userService.getUser(this.username).subscribe(users => this.users = users);
  }

  // Gets the listings information relevant to the user who's profile is currently open
  getListingInfo(username: string) {
    this.listingService.getSingleUserListings(username).subscribe(listings => this.listings = listings)
  }


  // Methods for displaying and getting the image 
  addImage(Username: string, Image: any) {
    this.userService.addImage(Username, Image).subscribe(success => { this.getUser() });
  }
  changeListener($event: { target: any; }) : void {
    if (confirm("Are you sure you want to use this image?")) {
      this.readImage($event.target);
      this.openSnackBar("Image uploaded successfully", "Ok")
    }
  }

  readImage(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      /* Send image off to Mongo */
      this.addImage(this.username, myReader.result);
    }
    myReader.readAsDataURL(file);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 4500,
    });
  }
  
  editListingRedirect(listing_to_edit: any, seller: any): void {
    this.router.navigate(['listing/' + seller + "/" + listing_to_edit + "/edit"]);
  }
}
