import { Component, OnInit, Input } from '@angular/core';
import { LocationModel } from '../../../../../models/database/location.model';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  @Input()
  public locationList: Array<LocationModel> = [];

  constructor() { }

  ngOnInit() {
  }

}
