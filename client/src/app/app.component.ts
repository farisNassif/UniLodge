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
  msgFromTheBackend
  username
  registrationConfirmation
  constructor(private appService: AppService, private http: HttpClient) { }

  ngOnInit () {
      this.getBackendMsg()
  }

  getBackendMsg (): void {
      this.appService.getMessage().subscribe(msgFromTheBackend => (this.msgFromTheBackend = msgFromTheBackend))
  }
  
  loginUser(event, username, password) {
    this.username = username
    this.appService.registerUser(this.username)
    .subscribe(registrationConfirmation => (this.registrationConfirmation = registrationConfirmation))
    event.preventDefault()
    console.log("Username: " + username + " Password: " + password)  
    // TODO - Just like in getBackendMsg(), print out the return object from the backend method in the frontend
  }
}
