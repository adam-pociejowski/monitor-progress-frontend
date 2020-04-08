import { NgModule } from '@angular/core';
import { SharedModule } from '../core/module/shared.module';
import { ActivityRoutingModule } from './activity-routing.module';
import { AddActivityComponent } from './component/activity-dashboard/add-activity/add-activity.component';
import { ActivityService } from './service/activity.service';
import { ToastService } from "../core/service/toast.service";
import { ActivityResultComponent } from './component/activity-dashboard/activity-result/activity.result.component';
import { ActivityDashboardComponent } from './component/activity-dashboard/activity-dashboard.component';
import { ActivityStatisticsComponent } from './component/activity-statistics/activity-statistics.component';
import {ActivityStatisticsService} from "./service/activity-statistics.service";

@NgModule({
  declarations: [
    AddActivityComponent,
    ActivityResultComponent,
    ActivityDashboardComponent,
    ActivityStatisticsComponent
  ],
  imports: [
    SharedModule,
    ActivityRoutingModule,
  ],
  providers: [
    ActivityService,
    ActivityStatisticsService,
    ToastService
  ]
})
export class ActivityModule { }
