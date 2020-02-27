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
          width: '89%',
          height: '450px',
          thumbnailsColumns: 4,
          lazyLoading: true,
          imageAutoPlay: false,
          previewZoom: true,
          previewRotate: true,
          previewDownload: true,
          previewBullets: true,
          imageAnimation: NgxGalleryAnimation.Slide
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
        small: this.image,
        medium: this.image,
        big: this.image
      },
      {
        small: 'https://media.gettyimages.com/photos/abstract-network-background-picture-id836272842?s=612x612',
        medium: 'https://media.gettyimages.com/photos/abstract-network-background-picture-id836272842?s=612x612',
        big: 'https://media.gettyimages.com/photos/abstract-network-background-picture-id836272842?s=612x612'
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
