import { NgModule } from '@angular/core';
import { SharedModule } from '../core/module/shared.module';
import { ToastService } from '../core/service/toast.service';
import { UserRoutingModule } from './user-routing.module';
import { SignInComponent } from './component/signin/sign-in.component';

@NgModule({
  declarations: [SignInComponent],
    imports: [
      SharedModule,
      UserRoutingModule
    ],
  providers: [
    ToastService
  ]
})
export class UserModule { }
