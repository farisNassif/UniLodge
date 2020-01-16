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

  constructor(private route: ActivatedRoute, private userService: UserService, private location: Location) { }

  ngOnInit() {
    console.log(this.route)
  }

	goBack(): void {
		this.location.back();
	}
}
