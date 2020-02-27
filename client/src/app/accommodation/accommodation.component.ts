import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { ListingService } from '../listings/listing.service';
import { Listing } from '../listings/listing';
import { Lightbox } from 'ngx-lightbox';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  listings: Listing[];
  listing_id: string = window.location.pathname.substring(15,999);
  image: string;

  constructor(private route: ActivatedRoute, private userService: UserService, 
  public router: Router, private listingService: ListingService) { }

  ngOnInit() {
    this.getListing()
    this.getImgs();

  }

  setupGallery() {
    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      {
          breakpoint: 400,
          preview: false
      }
  ];

  this.galleryImages = [
      {
          small: this.image,
          medium: this.image,
          big: this.image
      },
      {
          small: 'https://media.gettyimages.com/photos/abstract-network-background-picture-id836272842?s=612x612',
          medium: 'https://media.gettyimages.com/photos/abstract-network-background-picture-id836272842?s=612x612',
          big: 'https://media.gettyimages.com/photos/abstract-network-background-picture-id836272842?s=612x612'
      },
      {
          small: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
          medium: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
          big: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg'
      }
  ];
  }
  getImages(b64: string): void {
    this.image = b64;
  }
  getListing(): void {
    this.listingService.getListingById(this.listing_id).subscribe(listings => this.listings = listings)
  }
  
  getImgs(): void {
    this.listingService.getListingById(this.listing_id).subscribe(listings => {this.image =  listings[0].Image; this.setupGallery()})
    

  }

}
