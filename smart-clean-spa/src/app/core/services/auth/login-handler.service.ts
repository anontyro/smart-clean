import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from '../../../../../node_modules/rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalVars } from '../../../../data/globalVars';
import { LoginModel } from '../../../../models/auth/login.model';
import { TokenModel } from '../../../../models/auth/token.model';

@Injectable({
  providedIn: 'root'
})
export class LoginHandlerService {

  private loginUri = GlobalVars.apiUri + GlobalVars.auth.login;
  private tokenStorage = GlobalVars.tokenStorage;

  constructor(private http: HttpClient) { }

  public getNewToken(user: LoginModel) {
    const item = { email: user.username, password: user.password};

    this.createPostRequest(this.loginUri, item).subscribe((token: TokenModel) => {
      console.log(token);
    });

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
