import { NgModule } from '@angular/core';
import { SharedModule } from '../core/module/shared.module';
import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './component/activity/activity.component';
import { ActivityService } from './service/activity.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ActivityComponent
  ],
  imports: [
    SharedModule,
    ActivityRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    ActivityService
  ]
})
export class ActivityModule { }
