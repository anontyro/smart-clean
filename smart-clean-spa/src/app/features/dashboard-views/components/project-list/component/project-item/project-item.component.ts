import { ProjectModel } from './../../../../../../../models/database/project.model';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Router } from '../../../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input()
  public project: ProjectModel;
  constructor(private router: Router) { }

  ngOnInit() {

  }

  public openProject() {
    this.router.navigateByUrl('/project/' + this.project._id);
  }

  public displayDate() {
    if (!this.project || !this.project.created) {
      return ;
    }
    return moment(this.project.created).format('DD-MM-YYYY');
  }

}
