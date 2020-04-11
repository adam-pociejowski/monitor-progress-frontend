import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../service/activity.service';
import { Activity } from '../../../model/activity.model';
import { ActivityConfig } from '../../../model/activity.config.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MeasureType } from '../../../model/measure.type.enum';
import { Measure } from '../../../model/measure.model';
import { ToastService } from "../../../../core/service/toast.service";

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  configs: ActivityConfig[] = [];
  addActivityFormGroup = new FormGroup({
    name: new FormControl(''),
    measure: new FormGroup({
      value: new FormControl(0),
      type: new FormControl(MeasureType.REPEATS),
    }),
    type: new FormControl(null),
  });

  constructor(private activityService: ActivityService,
              private toastService: ToastService) {}

  ngOnInit() {
    this.activityService
      .getConfigs()
      .subscribe((configs: ActivityConfig[]) => {
        this.configs = configs;
        this.resetForm(configs[0]);
      })
  };

  onTypeChanged = (value) => this.activityService.getConfigByName(value)
    .subscribe((config: ActivityConfig) => {
      this.addActivityFormGroup.patchValue({
        measure: {
          type: config.measureType
        }});
    });

  onActivitySubmit = () => {
    let form = this.addActivityFormGroup.getRawValue();
    let activity = new Activity(form.name,
      new Date().toISOString(),
      form.type,
      new Measure(form.measure.type, form.measure.value),
      null,
      null);
    this.activityService.add(activity)
      .subscribe(
        (response) => {
          this.activityService.onActivityAdded.next(activity);
          this.activityService.getConfigByName(activity.type)
            .subscribe((config: ActivityConfig) => this.resetForm(config));
        },error => {
          console.error('Error while adding add-activity', error);
          this.toastService.error("Exception while adding activity");
        });
  };

  private resetForm = (config: ActivityConfig) =>
    this.addActivityFormGroup.setValue( {
      name: `activity_${AddActivityComponent.generateDefaultName()}`,
      measure: {
        value: 0,
        type: MeasureType.REPEATS
      },
      type: config.name
    });

  private static generateDefaultName = (): string => Math.floor(Math.random() * 1000000).toString();
}
