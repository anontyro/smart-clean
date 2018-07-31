import { GlobalVars } from './../../../../data/globalVars';
import { Injectable } from '@angular/core';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { TokenModel } from '../../../../models/auth/token.model';
import { Router } from '../../../../../node_modules/@angular/router';
import { HttpHeaders } from '../../../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userToken: TokenModel;

  constructor(private router: Router ) { this.onInIt(); }

  private onInIt() {
    this.addUserToken();
  }

  public async addUserToken() {
    const token = await this.getTokenFromStorage().catch(err => this.authError(err));
    this.userToken = token;
    return token;
  }

  public getToken() {
    return this.userToken.token;
  }

  public getUsername() {
    return this.userToken.username;
  }

  public getAuthHeader(): any {
    if (!this.userToken) {
      return this.authError('No user token supplied');
    }
    const headerList = {
      'Content-Type': 'application/json',
      'Authorization': this.userToken.token
    };

    return {headers: new HttpHeaders(headerList)};
  }

  private getTokenFromStorage(): Promise<any> {
    const token: TokenModel = JSON.parse(localStorage.getItem(GlobalVars.tokenStorage));
    if (token.token && token.token.length > 0) {
      return Promise.resolve(token);
    }
    return Promise.reject(false);
  }

  private authError(msg: string) {
    localStorage.removeItem(GlobalVars.tokenStorage);
    console.error(msg);
    return this.router.navigate(['/']);
  }


}
