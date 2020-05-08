import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

/* Component that handles Login */
export class UserLoginComponent implements OnInit {

  constructor(private userService: UserService, public router: Router) { }
  username: string
  loggedInUser: string
  password: string
  logged_in: any;


  ngOnInit() {
    /* If somebody is already logged in, return to home - Gotta logout before they can access /login again */
    if (localStorage.getItem('access_token') !== null) {
      this.router.navigate(['/home']);
    }
  }

  /* User Login, interacts with login service */
  loginUser(event: void, username: string, password: string) {
    /* Temp variables for propagation */
    this.username = username
    this.password = password
    this.loggedInUser = username

    /* Sends username/password to the backend in the format 'username_password' */
    this.userService.loginUser(this.username + "_" + this.password).subscribe(logged_in => this.checkLogin(this.logged_in = logged_in, this.loggedInUser))
  }

  /* Need to secure this in future with status code verification */
  checkLogin(login_result: any, username: any) {
    if (login_result != "Invalid Credentials") {
      /* Mapping username/login token token to their rexpective keys */
      localStorage.setItem("access_token", login_result); 
      localStorage.setItem("username", username);

      /* Nav to the profile of the user who just logged in */
      this.router.navigate(['/profile/' + username]);
    }
  }
}
