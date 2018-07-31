import { Component, OnInit, Input } from '@angular/core';
import { ProjectModel } from '../../../../../models/database/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  @Input()
  public projectList: Array<ProjectModel> = [];

  constructor() { }

  ngOnInit() {
  }

}
