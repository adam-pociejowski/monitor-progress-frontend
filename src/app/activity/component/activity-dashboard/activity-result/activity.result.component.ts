import {Component, Input, OnInit} from '@angular/core';
import {ActivityResult} from "../../../model/activity.result.model";
import {ActivityService} from "../../../service/activity.service";
import {Activity} from "../../../model/activity.model";
import {ActivityConfig} from "../../../model/activity.config.model";

@Component({
  selector: 'app-activity-result',
  templateUrl: './activity.result.component.html',
  styleUrls: ['./activity.result.component.css']
})
export class ActivityResultComponent implements OnInit {
  activity: ActivityResult;
  record: ActivityResult;

  ngOnInit(): void {
    this.activityService.onActivityAdded
      .subscribe((activity: Activity) => {
        this.activityService
          .getStats()
          .subscribe((stats: any) => {
            this.activityService.getConfigByName(activity.type)
              .subscribe((config: ActivityConfig) => {
                let factor = config.fitnessPointsFactor;
                this.activity = new ActivityResult(activity.type, activity.measure.value,activity.measure.value * factor);
                this.record = new ActivityResult(activity.type, stats[activity.type].max,stats[activity.type].max * factor);
              });
          });
      })
  }

  constructor(private activityService: ActivityService) {}
}
