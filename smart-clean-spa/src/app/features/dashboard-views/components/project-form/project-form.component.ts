import { ApiHandlerService } from './../../../../core/services/api/api-handler.service';
import { LoginHandlerService } from './../../../../core/services/auth/login-handler.service';
import { ProjectModel } from './../../../../../models/database/project.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { LocationModel } from '../../../../../models/database/location.model';
import { DeviceModel } from '../../../../../models/database/device.model';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  @Input()
  public project: ProjectModel;

  @Input()
  public locationList: Array<LocationModel> = [];

  public selectedLocation = '';

  public isLoading = false;


  constructor(
    private loginService: LoginHandlerService,
    private apiService: ApiHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkForProject();
  }

  private checkForProject() {
    if (this.project) {
      return;
    }
    const p: ProjectModel = {
      locationId: [],
      pid: '',
      display_name: '',
    };
    this.project = p;
  }

  public addLocation() {
    const list = this.project.locationId;
    if (!this.selectedLocation) {
      return;
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i] === this.selectedLocation) {
        return this.selectedLocation = '';
      }
    }
    this.project.locationId.push(this.selectedLocation);
    return this.selectedLocation = '';
  }

  public removeLocation(locationId: string) {
    const list = this.project.locationId;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === locationId) {
        return list.splice(i, 1);
      }
    }
  }

  public onSubmit(form: NgForm) {
    if (form.invalid) {
      return this.loginService.setFormFieldErrors(form);
    }
    this.isLoading = true;
    console.log(this.project);
    if (this.project._id) {
      this.updateProject();
    } else {
      this.pushProject();
    }
  }

  private updateProject() {
    this.apiService.putProjectUpdate(this.project)
      .subscribe(response => {
        this.apiService.getProjectList(true).subscribe(this.onSuccess());
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
  }

  private pushProject() {
    this.apiService
      .postNewProject(this.project)
      .subscribe(response => {
        console.log(response);
        this.apiService.getProjectList(true).subscribe(this.onSuccess());
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
  }

  private onSuccess() {
    this.project = undefined;
    this.checkForProject();
    this.router.navigate(['/']);
  }

}
