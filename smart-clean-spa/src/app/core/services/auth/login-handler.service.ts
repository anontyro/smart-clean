import { Injectable, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from '../../../../../node_modules/rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalVars } from '../../../../data/globalVars';
import { LoginModel } from '../../../../models/auth/login.model';
import { TokenModel } from '../../../../models/auth/token.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginHandlerService {

  private loginUri = GlobalVars.apiUri + GlobalVars.auth.login;
  private tokenStorage = GlobalVars.tokenStorage;

  public loginErrorEmitter: EventEmitter<any> = new EventEmitter();

  public ErrorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  public getNewToken(user: LoginModel, returnUrl: string) {

    const item = { email: user.username, password: user.password};

    this.createPostRequest(this.loginUri, item).subscribe((token: TokenModel) => {
      if (!token.token || token.token.length < 5) {
        return this.loginError('Unable to obtain the token from server');
      }

      this.loginSuccessful(token, returnUrl);
    }, err => this.loginError('Unable to contact server'));

  }

  public logout() {
    localStorage.removeItem(this.tokenStorage);
  }

  private loginSuccessful(token: TokenModel, returnUrl: string) {
    localStorage.setItem(this.tokenStorage, JSON.stringify(token));
    this.router.navigate([returnUrl]);
  }

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

  private createGetRequest(url: string): Observable<any> {
    return this.http.get<Array<any>>(url);
  }

  public createPostRequest(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

}
