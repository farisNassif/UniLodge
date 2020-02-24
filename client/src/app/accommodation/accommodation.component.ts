import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { ListingService } from '../listings/listing.service';
import { Listing } from '../listings/listing';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {
  listings: Listing[] = [];
  listing_id: string = window.location.pathname.substring(15,999);

  constructor(private route: ActivatedRoute, private userService: UserService, 
  public router: Router, private listingService: ListingService) { }

  ngOnInit() {
    this.getListing();
  }

  getListing(): void {
    this.listingService.getListingById(this.listing_id).subscribe(listings => this.listings = listings)
  }
}
