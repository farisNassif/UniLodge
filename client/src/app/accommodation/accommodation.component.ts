import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { ListingService } from '../listings/listing.service';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService, 
  public router: Router, private listingService: ListingService) { }

  ngOnInit() {
  }

}
