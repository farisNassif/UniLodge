import { Component, OnInit, Input  } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';


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
   
  }

	goBack(): void {
		this.location.back();
  }

  save(): void {
    if (this.new_password.length >= 4)  {
      this.username = window.location.pathname.substring(14,40);
      console.log(this.username);
      console.log(this.new_password);
      this.userService.updateUser(this.username, this.new_password).subscribe(success=> { this.location.back() });
    } else {
      this.message_from_backend = "Password must be more than 4 Characters";
    }
  }
}
