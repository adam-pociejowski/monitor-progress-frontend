import { Component, OnInit } from '@angular/core';
import { ActivityConfig } from "../../../model/activity/activity.config.model";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivityService } from "../../../service/activity.service";
import { ToastService } from "../../../../core/service/toast.service";
import { Activity } from "../../../model/activity/activity.model";
import { DocumentModel } from "../../../../core/model/document.model";

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {
  activity: DocumentModel<Activity>;
  configs: ActivityConfig[] = [];
  editActivityFormGroup: FormGroup;

  constructor(private activityService: ActivityService,
              private toastService: ToastService) {
    this.activity = this.activityService.editingActivity;
    this.editActivityFormGroup = new FormGroup({
      name: new FormControl(this.activity.value.name),
      measure: new FormGroup({
        value: new FormControl(this.activity.value.measure.value),
        type: new FormControl(this.activity.value.measure.type),
      }),
      type: new FormControl(this.activity.value.type),
    });
  }

  ngOnInit() {
    this.activityService
      .getConfigs()
      .subscribe((configs: ActivityConfig[]) => {
        this.configs = configs;
      })
  };

  onTypeChanged = (value) => this.activityService.getConfigByName(value)
    .subscribe((config: ActivityConfig) => {
      this.editActivityFormGroup.patchValue({
        measure: {
          type: config.measureType
        }});
    });

  onActivitySubmit = () => {
    let form = this.editActivityFormGroup.getRawValue();
    this.activity.value.name = form.name;
    this.activity.value.type = form.type;
    this.activity.value.measure.value = form.measure.value;
    this.activity.value.measure.type = form.measure.type;

    this.activityService.update(this.activity)
      .subscribe(() => {
          this.toastService.info(`Activity ${this.activity.value.name} successfully updated`);
        },error => {
          console.error('Error while adding add-activity', error);
          this.toastService.error(`Exception while editing activity ${this.activity.value.name}`);
        });
  };
}
