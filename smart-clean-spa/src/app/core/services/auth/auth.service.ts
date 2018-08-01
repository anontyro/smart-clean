import { GlobalVars } from './../../../../data/globalVars';
import { Injectable } from '@angular/core';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { TokenModel } from '../../../../models/auth/token.model';
import { Router } from '../../../../../node_modules/@angular/router';
import { HttpHeaders } from '../../../../../node_modules/@angular/common/http';

/**
 * @class Authorisation Service
 * Main auth service that works to ensure the token object is easily usable
 * by the application including building the headers for requests
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user token store
  private userToken: TokenModel;
  /** Standard constructor that requires a Router injected to allow page changes */
  constructor(private router: Router ) { this.onInIt(); }
  // private on create method
  private onInIt() {
    this.addUserToken();
  }
  /** async method that gets the token from storage and sends it back */
  public async addUserToken() {
    const token = await this.getTokenFromStorage().catch(err => this.authError(err));
    this.userToken = token;
    return token;
  }
  /** Getter method for the token */
  public getToken() {
    return this.userToken.token;
  }
  /** Getter method for the username */
  public getUsername() {
    return this.userToken.username;
  }
  /** Build an auth header for all secured routes send type JSON */
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
  // return the token from the storage return a promise
  private getTokenFromStorage(): Promise<any> {
    const token: TokenModel = JSON.parse(localStorage.getItem(GlobalVars.tokenStorage));
    if (token.token && token.token.length > 0) {
      return Promise.resolve(token);
    }
    return Promise.reject(false);
  }
  // any error thrown from auth is caught here
  private authError(msg: string) {
    localStorage.removeItem(GlobalVars.tokenStorage);
    console.error(msg);
    return this.router.navigate(['/']);
  }


}
