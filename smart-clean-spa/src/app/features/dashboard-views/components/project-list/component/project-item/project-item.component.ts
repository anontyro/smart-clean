import { ProjectModel } from './../../../../../../../models/database/project.model';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input()
  public project: ProjectModel;
  constructor() { }

  ngOnInit() {

  }

  public displayDate() {
    if (!this.project || !this.project.created) {
      return ;
    }
    return moment(this.project.created).format('DD-MM-YYYY');
  }

}
