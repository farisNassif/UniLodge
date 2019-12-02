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

  getBackendMsg (): void {
      this.appService.getMessage().subscribe(msgFromTheBackend => (this.msgFromTheBackend = msgFromTheBackend))
  }
  
  loginUser(event: void, username: string, password: string) {
    this.username = username
    this.password = password
    // Since username/pw is being cleared - want a temp way to store username for login purposes 'Welcome user [loggedInUser]'
    this.loggedInUser = username

    // Cowboy code, honestly no idea why it works but it did??
    // If the username/password field isn't blank
    if ((this.username != undefined) && (this.password != undefined)) {
      // This just sends username/password to the backend in the format 'username_password'
      this.appService.registerUser(this.username + "_" + this.password)
      .subscribe(registrationConfirmation => (this.registrationConfirmation = registrationConfirmation))  
      // Just printing to the console the temp logged in user
      console.log("Username: " + this.loggedInUser + " Password: " + password)  
      // 'Clearing' the fields after someone logged in, don't need em anymore - data sent to backend already
      this.username = undefined
      this.password = undefined    
    } 
  }
}
