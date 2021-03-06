import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router'
import { ListingService } from '../listings/listing.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Router,
                    useValue: {
                       url: '/accommodation/'
                    } 
                }
            ]
        });
    
    let route: ActivatedRoute
    let userService: UserService
    let router: Router
    let listingService: ListingService
    component = new HomeComponent(route,userService,router,listingService);
    })

    it('checks that listings are returned', ()=> {
        spyOn(component, "getListings");
        component.getListings();
        expect(component.listings).not.toEqual(null);
    })
  
    it('checks that listings navigation works', ()=> {
        let listing: '/6k5ypfaq0h8';
        const router = TestBed.get(Router);
        router.url = '/accommodation/' + '6k5ypfaq0h8';

        spyOn(component, "listingRedirect");
        component.listingRedirect(listing);

        expect(router.url).toEqual('/accommodation/6k5ypfaq0h8')
    })
});
