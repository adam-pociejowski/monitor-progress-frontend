import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from "@angular/common";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [],
  exports: [
    FontAwesomeModule,
    CommonModule,
    NgxChartsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule {
}
