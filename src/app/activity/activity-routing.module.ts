import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ActivityDashboardComponent } from "./component/activity-dashboard/activity-dashboard.component";
import { ActivityStatisticsComponent } from "./component/activity-statistics/activity-statistics.component";
import { ActivityFeedComponent } from "./component/activity-feed/activity-feed.component";
import { EditActivityComponent } from "./component/activity-feed/edit-activity/edit-activity.component";

const routes: Routes = [
  {
    path: 'new',
    component: ActivityDashboardComponent,
  },
  {
    path: 'statistics',
    component: ActivityStatisticsComponent,
  },
  {
    path: 'feed',
    component: ActivityFeedComponent,
  },
  {
    path: 'edit',
    component: EditActivityComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityRoutingModule {}
