import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user'
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { Router, } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Obtains the username
  username: string = window.location.pathname.substring(9,40);
  users: User[] = [];
  uploadedImage: any = [];
  userImage: any = [];
  public base64textString: any | ArrayBuffer;

  constructor(private route: ActivatedRoute, private userService: UserService, private location: Location, private router: Router) {}
  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
		this.userService.getUser(this.username).subscribe(users => this.users = users);
  }

  displayImage(Username: string) {
    this.uploadedImage = this.base64textString;

    this.addImage(Username);
  }

  addImage(Username: string) {
    this.userService.addImage(Username, this.uploadedImage).subscribe(success=> { this.getUser() });
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
