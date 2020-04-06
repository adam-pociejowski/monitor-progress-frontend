import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../service/activity.service';
import { DocumentModel } from '../../../core/model/document.model';
import { Activity } from '../../model/activity.model';
import { ActivityConfig } from '../../model/activity.config.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MeasureType } from '../../model/measure.type.enum';
import { Measure } from '../../model/measure.model';
import {ToastService} from "../../../core/service/toast.service";
import {ActivityResult} from "../../model/activity.result.model";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  configs: ActivityConfig[] = [];
  activities: DocumentModel<Activity>[];
  currentResult: ActivityResult;
  recordResult: ActivityResult;
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
      .findOlderDocuments(10, null)
      .subscribe((activities: DocumentModel<Activity>[]) => {
        this.activities = activities;
        console.log('activities', this.activities);
      });
    this.activityService
      .findConfig()
      .subscribe(((configs: ActivityConfig[]) => {
        this.configs = configs;
        this.resetForm();
      }));
  };

  onTypeChanged = (value) =>
    this.addActivityFormGroup.patchValue({
      measure: {
        type: this.getConfigByName(value).measureType
      }
    });

  onActivitySubmit = () => {
    let form = this.addActivityFormGroup.getRawValue();
    this.activityService.add(new Activity(form.name,
      new Date().toISOString(),
      form.type,
      new Measure(form.measure.type, form.measure.value),
      null,
      null))
      .subscribe(
        (response) => {
          this.activityService
            .getStats()
            .subscribe((stats: any) => {
              let factor = this.getConfigByName(form.type).fitnessPointsFactor;
              this.currentResult = new ActivityResult(form.type, form.measure.value,form.measure.value * factor);
              this.recordResult = new ActivityResult(form.type, stats[form.type].max,stats[form.type].max * factor);
              this.toastService.info("Activity successfully added");
              this.resetForm();
            });
        },error => {
          console.error('Error while adding activity', error);
          this.toastService.error("Exception while adding activity");
        });
  };

  private getConfigByName = (name: string) => {
    console.log(this.configs, name);
    for (let config of this.configs)
      if (config.name === name)
        return config;
  };

  private resetForm = () =>
    this.addActivityFormGroup.setValue( {
      name: `activity_${ActivityComponent.generateDefaultName()}`,
      measure: {
        value: 0,
        type: MeasureType.REPEATS
      },
      type: this.configs[0].name
    });

  private static generateDefaultName = (): string => Math.floor(Math.random() * 1000000).toString();
}
