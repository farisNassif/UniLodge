import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user/user'
import { UserService } from '../user/user.service';
import { Router } from '@angular/router'
import { ListingService } from '../listings/listing.service';
import { Listing } from '../listings/listing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  listings: Listing[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService, 
  public router: Router, private listingService: ListingService) { }

  ngOnInit() {
    this.getListings();
  }

  // Required for displaying listings
  getListings(): void {
    this.listingService.getListings().subscribe(listings => this.listings = listings);
  }

  public listingRedirect(listing_id : any) {
    this.router.navigate(['/accommodation/' + listing_id]);
  }
}
