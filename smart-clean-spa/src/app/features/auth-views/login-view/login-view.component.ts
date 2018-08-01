import { LoginHandlerService } from './../../../core/services/auth/login-handler.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginModel } from '../../../../models/auth/login.model';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import {takeWhile} from 'rxjs/operators';

/**
 * @class Login View
 * Main script for the login view used in conjunction with the
 * login-handler service to provide a user login
 */
@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit, OnDestroy {

  /** login object that is the main model for the form */
  public userLogin: LoginModel = new LoginModel('', '', true);
  /** Login error to be displayed for hte user */
  public loginError = '';
  /** Loading control to ensure the user is aware they are being logged in */
  public isLoading = false;
  // subscription control
  private keepAlive = true;
  // the return string for the user in case they are redirected
  private returnUrl;
  /** standard constructor takes the loginService and ActivedRoute for the return url */
  constructor(
    private loginService: LoginHandlerService,
    private route: ActivatedRoute
  ) { }
  /** if hte user has a token remove it, get there return url */
  ngOnInit() {
    this.loginService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.listeners();
  }
  // helper class that contains subscriptions useful to this class
  private listeners() {
    this.loginService.loginErrorEmitter
      .pipe(takeWhile(() => this.keepAlive))
      .subscribe(response => {
        this.isLoading = false;
        this.loginError = response;
    });
  }

  /**
   * Form Submit method that will control the flow of the form being submitted
   * checks for errors in the form first if it has it will force them to be displayed
   * else will call the login service for login attempt
   * @param loginForm Angular form object containing all the login details
   */
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
  // remove open subscriptions
  ngOnDestroy(): void {
    this.keepAlive = false;
  }
}
