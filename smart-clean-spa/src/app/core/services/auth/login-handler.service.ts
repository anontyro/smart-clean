import { Injectable, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from '../../../../../node_modules/rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalVars } from '../../../../data/globalVars';
import { LoginModel } from '../../../../models/auth/login.model';
import { TokenModel } from '../../../../models/auth/token.model';
import { Router } from '@angular/router';

/**
 * @class Login Handler Service
 * This service is used exclusively when the user is not authenticated
 * once authenticated they should be using the auth service
 * contains all the requests and logic on how to log a user in
 */
@Injectable({
  providedIn: 'root'
})
export class LoginHandlerService {

  private loginUri = GlobalVars.apiUri + GlobalVars.auth.login;
  private tokenStorage = GlobalVars.tokenStorage;
  /** On error emit the error to be handled on the frontend to provide user feedback */
  public loginErrorEmitter: EventEmitter<any> = new EventEmitter();
  /** error message store */
  public ErrorMessage = '';
  /** standard constructor taking two dependancies for http and routing */
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Core Login method used to log the user in
   * Requires a user object to be re-encoded and sent to the server
   * if successful will set the token and redirect to the users return url
   * @param user complete User object
   * @param returnUrl return url string for successful login
   */
  public getNewToken(user: LoginModel, returnUrl: string) {

    const item = { email: user.username, password: user.password};

    this.createPostRequest(this.loginUri, item).subscribe((token: TokenModel) => {
      if (!token.token || token.token.length < 5) {
        return this.loginError('Unable to obtain the token from server');
      }

      this.loginSuccessful(token, returnUrl);
    }, err => this.loginError('Unable to contact server'));

  }
  /** On Logout remove token from storage */
  public logout() {
    localStorage.removeItem(this.tokenStorage);
  }
  // helper method used to set the token and redirect the user
  private loginSuccessful(token: TokenModel, returnUrl: string) {
    localStorage.setItem(this.tokenStorage, JSON.stringify(token));
    this.router.navigate([returnUrl]);
  }
  /**
   * On login error emit the message to be displayed to the user
   * @param message String error message
   */
  public loginError(message) {
    this.loginErrorEmitter.emit(message);
    this.ErrorMessage = message;
    console.error(message);
  }

    /**
   * Method that works over the form and sets all fields to touched to display any hidden
   * errors generally onsubmit
   * @param form NgForm object to itterate over
   */
  public setFormFieldErrors(form: NgForm) {
    // tslint:disable-next-line:forin
    for (const i in form.controls) {
      form.controls[i].markAsTouched();
    }
  }
  // make a get request with no security
  private createGetRequest(url: string): Observable<any> {
    return this.http.get<Array<any>>(url);
  }
  // make a post request no security so only for login requests
  public createPostRequest(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

}
