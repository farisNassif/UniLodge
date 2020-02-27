import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user'
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { Router, } from "@angular/router";
import { AppComponent } from 'src/app/app.component';
import { ListingService } from 'src/app/listings/listing.service';
import { Listing } from 'src/app/listings/listing';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Obtains the username
  username: string = window.location.pathname.substring(9,40);

  users: User[] = [];
  user_listings: Listing[] = []

  uploadedImage: any = [];
  userImage: any = [];

  public base64textString: any | ArrayBuffer;

  constructor(private route: ActivatedRoute, private userService: UserService,
  private location: Location, private listingService: ListingService) {}
  
  ngOnInit() {
    this.getUser();
  }

  // Gets the individual user information for which the profile is relevant
  getUser(): void {
		this.userService.getUser(this.username).subscribe(users => this.users = users);
  }

  // Gets the listings information relevant to the user who's profile is currently open
  getListingInfo(username: string) {
    this.listingService.getSingleUserListings(this.username).subscribe(user_listings => this.user_listings = user_listings)
  }

  // Methods for displaying and getting the image 
  displayImage(Username: string) {
    this.uploadedImage = this.base64textString;

    this.addImage(Username);
  }

  addImage(Username: string) {
    this.userService.addImage(Username, this.uploadedImage).subscribe(success => { this.getUser(); this.getListingInfo(window.location.pathname.substring(9,40))});
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
}
