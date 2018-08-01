import { MockLocation1, MockLocation2 } from './../../../../../testing/mocks/location.mocks';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationListComponent } from './location-list.component';
import { LocationItemComponent } from './components/location-item/location-item.component';

describe('LocationListComponent', () => {
  let component: LocationListComponent;
  let fixture: ComponentFixture<LocationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationListComponent, LocationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationListComponent);
    component = fixture.componentInstance;
    component.locationList = [MockLocation1, MockLocation2];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
