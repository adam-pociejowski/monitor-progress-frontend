import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ActivityDashboardComponent } from "./component/activity-dashboard/activity-dashboard.component";
import { ActivityStatisticsComponent } from "./component/activity-statistics/activity-statistics.component";
import { ActivityFeedComponent } from "./component/activity-feed/activity-feed.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityRoutingModule {}
