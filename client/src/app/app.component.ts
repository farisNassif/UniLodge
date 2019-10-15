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

  constructor(private appService: AppService, private http: HttpClient) { }

  ngOnInit () {
      this.getBackendMsg()
  }

  getBackendMsg (): void {
      this.appService.getMessage().subscribe(msgFromTheBackend => (this.msgFromTheBackend = msgFromTheBackend))
  }
  
  loginUser(event) {
    event.preventDefault()
    console.log(event)
  }
}
