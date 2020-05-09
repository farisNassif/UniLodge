import { Component, OnInit } from '@angular/core';
import { Listing } from '../listing';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-listings',
  templateUrl: './edit-listings.component.html',
  styleUrls: ['./edit-listings.component.css']
})
export class EditListingsComponent implements OnInit {
  Title: string
  Seller: string = window.location.pathname.substring(9,999);
  UserLocation : any;
  Location = ['Athenry', 'Ballybrit', 'Claregalway', 'Craughwell', 'Galway City',
              'Gort','Loughrea', 'Salthill', 'Oranmore'];
  price: number
  ContactNumber: string
  Image?: string
  _id?: number

  // Required for listing model
  image: string | ArrayBuffer;
  base64textString: any | ArrayBuffer = "https://placehold.it/270x80?text=IMAGE";
  uploadedImage: any = [];
  userImage: any = [];
  imageStatus: string = '';
  r_gen_id: string;

  constructor(private listingService: ListingService, private router: Router) { }

  ngOnInit() {
  }

}
