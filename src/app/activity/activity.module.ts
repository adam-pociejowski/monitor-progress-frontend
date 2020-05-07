import { NgModule } from '@angular/core';
import { SharedModule } from '../core/module/shared.module';
import { ActivityRoutingModule } from './activity-routing.module';
import { AddActivityComponent } from './component/activity-dashboard/add-activity/add-activity.component';
import { ToastService } from "../core/service/toast.service";
import { ActivityResultComponent } from './component/activity-dashboard/activity-result/activity.result.component';
import { ActivityDashboardComponent } from './component/activity-dashboard/activity-dashboard.component';
import { ActivityStatisticsComponent } from './component/activity-statistics/activity-statistics.component';
import { ActivityStatisticsService } from "./service/activity-statistics.service";
import { ActivityFeedComponent } from './component/activity-feed/activity-feed.component';
import { ShortDatePipe } from "../core/pipe/short.date.pipe";
import { EditActivityComponent } from './component/activity-feed/edit-activity/edit-activity.component';
import { ProgressDashboardComponent } from './component/progress-dashboard/progress-dashboard.component';
import { MaterialModule } from "../core/module/material.module";
import { GoalPanelComponent } from './component/activity-dashboard/goal-panel/goal-panel.component';
import { AddGoalComponent } from './component/activity-dashboard/goal-panel/add-goal/add-goal.component';
import { GoalListComponent } from './component/activity-dashboard/goal-panel/goal-list/goal-list.component';
import { GoalElementComponent } from './component/activity-dashboard/goal-panel/goal-list/goal-element/goal-element.component';

@NgModule({
  declarations: [
    AddActivityComponent,
    ActivityResultComponent,
    ActivityDashboardComponent,
    ActivityStatisticsComponent,
    ActivityFeedComponent,
    ShortDatePipe,
    EditActivityComponent,
    ProgressDashboardComponent,
    GoalPanelComponent,
    AddGoalComponent,
    GoalListComponent,
    GoalElementComponent,
  ],
    imports: [
      SharedModule,
      ActivityRoutingModule,
      MaterialModule
    ],
  providers: [
    ActivityStatisticsService,
    ToastService
  ]
})
export class ActivityModule { }
