import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { ListingService } from '../listings/listing.service';
import { Listing } from '../listings/listing';
import { Lightbox } from 'ngx-lightbox';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  listings: Listing[];
  comments: Comment[];
  user: any;
  listing_id: string = window.location.pathname.substring(15,999);
  image: string;
  comment_content: string = "";
  r_gen_id: string; // Gen comment ID
  Comment: any; // Unused, but required

  constructor(private route: ActivatedRoute, private userService: UserService, 
  public router: Router, private listingService: ListingService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getListing();
    this.getImgs();
    this.getComments();
  }

  /* Function that declares and contains all relevant Gallery setup functions */
  setupGallery() {
    /* Setup Gallery Dimensions */
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

  /* Setup Gallery images */
  this.galleryImages = [
      {
        small: this.image,
        medium: this.image,
        big: this.image
      },
      {
        small: 'https://thumb.housinganywhere.com/images/listing/1609062/450x300/8baf0120-f1a0-469a-900d-7e2f53ab075b?t=crop',
        medium: 'https://thumb.housinganywhere.com/images/listing/1609062/450x300/8baf0120-f1a0-469a-900d-7e2f53ab075b?t=crop',
        big: 'https://thumb.housinganywhere.com/images/listing/1609062/450x300/8baf0120-f1a0-469a-900d-7e2f53ab075b?t=crop'
      },
      {
        small: this.image,
        medium: this.image,
        big: this.image
      },
      {
        small: 'https://thumb.housinganywhere.com/images/listing/1609062/450x300/8baf0120-f1a0-469a-900d-7e2f53ab075b?t=crop',
        medium: 'https://thumb.housinganywhere.com/images/listing/1609062/450x300/8baf0120-f1a0-469a-900d-7e2f53ab075b?t=crop',
        big: 'https://thumb.housinganywhere.com/images/listing/1609062/450x300/8baf0120-f1a0-469a-900d-7e2f53ab075b?t=crop'
      }
  ];
  }

  /* Compares current logged in user against comment authors */
  get commentAuth() {
    if (localStorage.getItem('username') != null) {
      this.user = localStorage.getItem('username')
      return this.user
    } else {
      return false
    }
  }

  /* Retrive all images associated with this listing */
  getImages(b64: string): void {
    this.image = b64;
  }
  
  /* Retrieves the specific listing (Based on which listing was viewed by the user) */
  getListing(): void {
    this.listingService.getListingById(this.listing_id).subscribe(listings => this.listings = listings)
  }
  
  /* Retrieves the images and displays them in the Gallery */
  getImgs(): void {
    this.listingService.getListingById(this.listing_id).subscribe(listings => {this.image =  listings[0].Image; this.setupGallery()})
  }

  /* Function that handles retrieving comment content and passing it to Mongo via Python */
  submitComment(content: string): void {
    if (content != undefined && content.length > 15) {
      let r_gen_id = Math.random().toString(36).substring(1); // Gen random ID for the Comment

      /* Prepping the comment object before it's sent to the backend */
      let comment_payload = { 
        Comment_ID: r_gen_id.replace('.', ''), Listing_ID: this.listing_id,
        Poster: localStorage.getItem("username"), Content: content, Timestamp: ""
      };

      this.listingService.newComment(comment_payload).subscribe(success => { this.getComments() });

      console.log(content);
      console.log(localStorage.getItem("username"));
      console.log(this.listing_id);
      this.openSnackBar("Comment successfully added", "Ok")
    } else {
      this.openSnackBar("Comment must be at least 15 Characters", "Ok");
    }
  }

  /* Loads all comments for the viewed listing */
  getComments(): void {
    this.listingService.getComments(this.listing_id).subscribe(comments => this.comments = comments)
  }

  /* Deletes a specific comment if the person logged in is the author */
  deleteComment(CommentID: any): void {
    this.listingService.deleteComment(CommentID).subscribe(success => { this.getComments() })
    this.openSnackBar("Comment successfully deleted", "Ok")
  }

  /* If someone tries to delete a comment that isn't theirs */
  deleteDenied(): void {
    this.openSnackBar("That comment can't be deleted as you're not the author", "Ok")
  }

  /* Snackbar initializer, popup information message skeleton for the user */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 3500,
    });
  } 

}
