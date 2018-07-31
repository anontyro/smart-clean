import { ApiHandlerService } from './../../../core/services/api/api-handler.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { takeWhile } from '../../../../../node_modules/rxjs/operators';
import { ProjectCompleteModel } from '../../../../models/database/project.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public project: ProjectCompleteModel;

  private projectId: string;
  private keepAlive = true;

  constructor(
    private route: ActivatedRoute,
    private apiHandlerService: ApiHandlerService
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(takeWhile(() => this.keepAlive))
      .subscribe(params => {
        this.projectId = params['id'];
        this.buildPage();
      });
  }

  private buildPage() {
    this.isLoading = true;
    this.apiHandlerService.getProjectDetail(this.projectId)
      .pipe(takeWhile(() => this.keepAlive))
      .subscribe(response => {
        this.project = response.project;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.keepAlive = false;
  }

}
