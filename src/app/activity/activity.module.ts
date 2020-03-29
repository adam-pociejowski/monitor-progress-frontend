import { NgModule } from '@angular/core';
import { SharedModule } from '../core/module/shared.module';
import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './component/activity/activity.component';
import { ActivityService } from './service/activity.service';

@NgModule({
  declarations: [
    ActivityComponent
  ],
  imports: [
    SharedModule,
    ActivityRoutingModule
  ],
  providers: [
    ActivityService
  ]
})
export class ActivityModule { }
