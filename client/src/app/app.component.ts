import { Component, OnInit } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient } from '@angular/common/http'
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit{
  msgFromTheBackend: String // Whatever is returned from python - Eg "Registration Successful/Unsuccessful"
  user: String;
  password: String
  username: String
  public static loggedInUser: String; // Temp logged in user 
  
  
  
  constructor(private appService: AppService, private http: HttpClient, private router: Router,
  private activatedRoute: ActivatedRoute, private titleService: Title) { }

  ngOnInit () {
    this.user = AppComponent.loggedInUser;
    AppComponent.loggedInUser = ""
  }
  
  loginUser(event: void, username: string, password: string) {
    this.username = username
    this.password = password
  }

  logout() {
    localStorage.clear(); // Clear localstorage token
    this.user = AppComponent.loggedInUser;
    AppComponent.loggedInUser = ""
  }

  get loginStatus() {
    this.user = AppComponent.loggedInUser;
    return AppComponent.loggedInUser;
  }
}
