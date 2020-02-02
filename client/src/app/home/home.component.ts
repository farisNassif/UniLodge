import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user/user'
import { UserService } from '../user/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  // Required on init for users images to be loaded
  getUsers(): void {
		this.userService.getUsers().subscribe(users => this.users = users);
  }

}
