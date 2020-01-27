import { Component, OnInit } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient } from '@angular/common/http'
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

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

  password: String
  username: String
  
  loggedInUser: String // Temp logged in user 
  
  
  
  constructor(private appService: AppService, private http: HttpClient, private router: Router,
  private activatedRoute: ActivatedRoute, private titleService: Title) { }

  ngOnInit () {
    this.getBackendMsg();

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
        let title = 'Change this in routing.ts  '
        if(event['title']) {
            title = event['title'];
        }
        this.titleService.setTitle(title);
    });
  }

  // Backend setup previously and linked with angular via 'proxy.conf.json'
  getBackendMsg (): void {
    this.appService.home().subscribe(msgFromTheBackend => (this.msgFromTheBackend = msgFromTheBackend))
  }
  
  loginUser(event: void, username: string, password: string) {
    this.username = username
    this.password = password
    // Since username/pw is being cleared - want a temp way to store username for login purposes 'Welcome user [loggedInUser]'
    this.loggedInUser = username
  }
}
