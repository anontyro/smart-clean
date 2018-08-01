import { LoginHandlerService } from './../../../core/services/auth/login-handler.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginViewComponent } from './login-view.component';
import { RouterTestingModule } from '../../../../../node_modules/@angular/router/testing';
import { FormsModule } from '../../../../../node_modules/@angular/forms';
import { HttpClientTestingModule } from '../../../../../node_modules/@angular/common/http/testing';

describe('LoginViewComponent', () => {
  let component: LoginViewComponent;
  let fixture: ComponentFixture<LoginViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginViewComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
         HttpClientTestingModule
        ],
      providers: [LoginHandlerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
