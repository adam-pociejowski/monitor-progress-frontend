import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../service/activity.service';
import { DocumentModel } from '../../../core/model/document.model';
import { Activity } from '../../model/activity.model';
import { ActivityConfig } from '../../model/activity.config.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MeasureType } from '../../model/measure.type.enum';
import { Measure } from '../../model/measure.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activities: DocumentModel<Activity>[];
  configs: ActivityConfig[] = [];
  addActivityFormGroup = new FormGroup({
    name: new FormControl(''),
    measure: new FormGroup({
      value: new FormControl(0),
      type: new FormControl(MeasureType.REPEATS),
    }),
    type: new FormControl(null),
  });

  constructor(private activityService: ActivityService) {
  }

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
        console.log(configs);
        this.addActivityFormGroup.setValue({
          name: `activity_${ActivityComponent.generateDefaultName()}`,
          measure: {
            value: 0,
            type: MeasureType.REPEATS
          },
          type: this.configs[0].name
        });
      }));
  };

  onTypeChanged = (value) => {
    this.addActivityFormGroup.patchValue({
      measure: {
        type: this.getConfigByName(value).measureType
      }
    });
  };

  onActivitySubmit = () => {
    let form = this.addActivityFormGroup.getRawValue();
    this.activityService.add(new Activity(form.name,
      new Date().toISOString(),
      form.type,
      new Measure(form.measure.type, form.measure.value),
      null,
      null))
      .subscribe(
        (response) => console.log('Activity added', response),
        error => console.log('Error while adding activity', error));
  };

  private getConfigByName = (name: string) => {
    for (let config of this.configs) {
      if (config.name === name) {
        return config;
      }
    }
  };

  private static generateDefaultName(): string {
    return Math.floor(Math.random() * 1000000).toString();
  }
}
