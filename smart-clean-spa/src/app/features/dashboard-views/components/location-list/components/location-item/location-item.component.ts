import { LocationModel } from './../../../../../../../models/database/location.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss']
})
export class LocationItemComponent implements OnInit {

  @Input()
  public location: LocationModel;
  constructor() { }

  ngOnInit() {
  }

}
