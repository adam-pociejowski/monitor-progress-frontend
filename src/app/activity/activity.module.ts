import { NgModule } from '@angular/core';
import { SharedModule } from '../core/module/shared.module';
import { ActivityRoutingModule } from './activity-routing.module';
import { AddActivityComponent } from './component/activity-dashboard/add-activity/add-activity.component';
import { ActivityService } from './service/activity.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastService } from "../core/service/toast.service";
import { ActivityResultComponent } from './component/activity-dashboard/activity-result/activity.result.component';
import { ActivityDashboardComponent } from './component/activity-dashboard/activity-dashboard.component';

@NgModule({
  declarations: [
    AddActivityComponent,
    ActivityResultComponent,
    ActivityDashboardComponent
  ],
  imports: [
    SharedModule,
    ActivityRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    ActivityService,
    ToastService
  ]
})
export class ActivityModule { }
