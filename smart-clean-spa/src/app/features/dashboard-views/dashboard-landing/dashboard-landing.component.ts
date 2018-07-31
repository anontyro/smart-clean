import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-landing',
  templateUrl: './dashboard-landing.component.html',
  styleUrls: ['./dashboard-landing.component.scss']
})
export class DashboardLandingComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
