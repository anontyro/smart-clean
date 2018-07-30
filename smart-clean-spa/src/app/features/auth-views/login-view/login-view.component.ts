import { LoginHandlerService } from './../../../core/services/auth/login-handler.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginModel } from '../../../../models/auth/login.model';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit, OnDestroy {


  public userLogin: LoginModel = new LoginModel('', '', true);
  public loginError = '';
  public isLoading = false;

  private keepAlive = true;

  private returnUrl;

  constructor(
    private loginService: LoginHandlerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loginService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.listeners();
  }

  private listeners() {
    this.loginService.loginErrorEmitter
      .pipe(takeWhile(() => this.keepAlive))
      .subscribe(response => {
        this.isLoading = false;
        this.loginError = response;
    });
  }

  public onSubmit(loginForm: NgForm) {
    this.loginError = '';
    if (loginForm.invalid) {
      this.loginService.setFormFieldErrors(loginForm);
      this.loginError = 'Ensure all form fields are entered correctly';
      return;
    }
    this.isLoading = true;
    this.loginService.getNewToken(this.userLogin, this.returnUrl);

  }

  ngOnDestroy(): void {
    this.keepAlive = false;
  }
}
