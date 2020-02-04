import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user'
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string = window.location.pathname.substring(9,40);
  users: User[] = [];
  profileUserName : String = "Username Placeholder"

  constructor(private route: ActivatedRoute, private userService: UserService) {}
  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
		this.userService.getUser(this.username).subscribe(users => this.users = users);
  }
}
