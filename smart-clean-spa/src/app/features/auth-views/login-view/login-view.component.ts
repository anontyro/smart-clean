import { LoginHandlerService } from './../../../core/services/auth/login-handler.service';
import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../../../models/auth/login.model';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  public userLogin: LoginModel = new LoginModel('', '', true);

  public isLoading = false;

  constructor(private loginService: LoginHandlerService) { }

  ngOnInit() {
  }

  public onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      this.loginService.setFormFieldErrors(loginForm);
      return;
    }
    this.loginService.getNewToken(this.userLogin);
    return console.log('valid');

  }

}
