import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ActivityComponent } from './component/activity/activity.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityRoutingModule {}
