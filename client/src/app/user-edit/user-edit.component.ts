import { Component, OnInit, Input  } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { User } from '../user-list/user';
import { UserService } from '../user-list/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  username: string;
  new_password: string;
  message_from_backend: any = "Please enter your new password or press back";

  constructor(private route: ActivatedRoute, private userService: UserService, private location: Location) { }

  ngOnInit() {
    console.log(this.route)
  }

	goBack(): void {
		this.location.back();
  }

  save(Password: string): void {
    this.username = window.location.pathname.substring(14,40);
    console.log(this.username);
    console.log(this.new_password);
    this.userService.updateUser(this.username, this.new_password).subscribe(message_from_backend => (this.message_from_backend = message_from_backend));
	}
}
