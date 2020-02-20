import { Component, OnInit } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient } from '@angular/common/http'
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, NavigationError, NavigationCancel, NavigationStart, Event } from '@angular/router';
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
  // Stuff for spinner
  // showLoadingIndicator = true;
  // this.showLoadingIndicator = true;
  // this.showLoadingIndicator = false;

  msgFromTheBackend: String // Whatever is returned from python - Eg "Registration Successful/Unsuccessful"
  user: String;
  password: String
  username: String
  
  
  constructor(private appService: AppService, private http: HttpClient, private router: Router,
  private activatedRoute: ActivatedRoute, private titleService: Title) { }
  
  ngOnInit () {
    // Required code for setting tab title depending on the route currently accessed
    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
        
    })
    .filter((route) => route.outlet === 'primary')
    .mergeMap((route) => route.data)
    .subscribe((event) => {
        let title = 'Default Title Here'
        if(event['title']) {
            title = event['title'];
        }
        this.titleService.setTitle(title);    
    });
  }

  logout() {
    localStorage.removeItem("access_token"); // Clear localstorage token
    localStorage.removeItem("username"); // Clear User
  }

  get loginStatus() {
    if (localStorage.getItem('access_token') != null) {
      this.user = localStorage.getItem('username')
      return true
    } else {
      return false
    }
  }
}
