import { Component, OnInit } from '@angular/core'
import { AppService } from './app.service'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit{
  msgFromTheBackend: String
  username: String
  loggedInUser: String
  password: String
  registrationConfirmation: String
  constructor(private appService: AppService, private http: HttpClient) { }

  ngOnInit () {
      this.getBackendMsg()
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
