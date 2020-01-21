import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { User } from './user'
import { UserService } from './user.service';
import { ReadVarExpr } from '@angular/compiler';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  msgFromTheBackend: String
  users: User[] = [];
  imageSrc: any;
  base64textString = [];
  Username : String
  image: string | ArrayBuffer;

  constructor(private route: ActivatedRoute, private userService: UserService) {}
  ngOnInit() {
    this.msgFromTheBackend = "dada"
    this.getUsers();
  }

  getUsers(): void {
		this.userService.getUsers().subscribe(users => this.users = users);
  }

  removeUser(Username: string):  void {
    this.userService.removeUser(Username)
    .subscribe(msgFromTheBackend => (this.msgFromTheBackend = msgFromTheBackend));
    this.ngOnInit();
    //this.userService.removeUser(Username).subscribe(success=> { this.getUsers() });
  }

  updateUser(Username: string):  void {
    this.userService.updateUser(Username).subscribe(success=> { this.getUsers() });
  }

  changeListener($event: { target: any; }) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = (<string>myReader.result).split(',')[1];
      
      // Base64 String of image
      console.log(this.image);
      
    }
    myReader.readAsDataURL(file);
  }
  
  readURL(event: Event): void {
      //const file = (<HTMLInputElement>event.target).files[0];
    
      //const reader:FileReader = new FileReader();

      //reader.onload = e => this.imageSrc = reader.result;

      //console.log(reader.readAsDataURL(event.target.files[0]));
      //console.log(file.name)
      // console.log(reader.readAsDataURL(file));
  } 
   
}


