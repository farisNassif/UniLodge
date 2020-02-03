import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileUserName : String = "Username Placeholder"


  ngOnInit() {
  }
  
  getCurrentUser()
  {
    
  }// getCurrentUser
}
