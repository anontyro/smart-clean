import { ApiHandlerService } from './../../../core/services/api/api-handler.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { LocationModel } from '../../../../models/database/location.model';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit, OnDestroy {


  private keepAlive = true;

  public locationList: Array<LocationModel> = [];

  constructor(private apiService: ApiHandlerService) { }

  ngOnInit() {
    this.apiService.getLocationList()
    .pipe(takeWhile(() => this.keepAlive ))
    .subscribe(list => this.locationList = list.locationList);
  }


  ngOnDestroy(): void {
    this.keepAlive = false;
  }
}
