import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ActivityDashboardComponent } from "./component/activity-dashboard/activity-dashboard.component";
import { ActivityStatisticsComponent } from "./component/activity-statistics/activity-statistics.component";

const routes: Routes = [
  {
    path: 'new',
    component: ActivityDashboardComponent,
  },
  {
    path: 'statistics',
    component: ActivityStatisticsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityRoutingModule {}
