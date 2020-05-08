import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {

    let expected = ''


    beforeEach(()=> {
        expected = 'expected'
    })

    it('checks if hellotest is hellotest', 
    ()=>expect('hellotest').toBe('hellotest'))

  
});
