import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserGuard } from './user/guard/user.guard';

const routes: Routes = [
  {
    canActivateChild: [UserGuard],
    path: 'activity',
    loadChildren: './activity/activity.module#ActivityModule',
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
  },
  {
    path: '**',
    redirectTo: 'user'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
