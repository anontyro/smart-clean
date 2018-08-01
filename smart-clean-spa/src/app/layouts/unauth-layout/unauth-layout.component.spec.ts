import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthLayoutComponent } from './unauth-layout.component';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';

describe('UnauthLayoutComponent', () => {
  let component: UnauthLayoutComponent;
  let fixture: ComponentFixture<UnauthLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthLayoutComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
