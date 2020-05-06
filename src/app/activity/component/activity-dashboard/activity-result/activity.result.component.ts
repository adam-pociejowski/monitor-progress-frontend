import {Component, Input, OnInit} from '@angular/core';
import {ActivityResult} from "../../../model/activity.result.model";
import {ActivityService} from "../../../service/activity.service";
import {Activity} from "../../../model/activity.model";
import {ActivityConfig} from "../../../model/activity.config.model";
import {ActivityStatisticsService} from "../../../service/activity-statistics.service";
import {GroupType} from "../../../../core/model/group.type.enum";
import {ReducedResultService} from "../../../../core/service/reduced.result.service";

@Component({
  selector: 'app-activity-result',
  templateUrl: './activity.result.component.html',
  styleUrls: ['./activity.result.component.css']
})
export class ActivityResultComponent implements OnInit {
  activity: ActivityResult;
  record: ActivityResult;

  constructor(private activityService: ActivityService,
              private activityStatisticsService: ActivityStatisticsService) {}

  ngOnInit(): void {
    this.activityService.onActivityAdded
      .subscribe((activity: Activity) => {
        this.activityStatisticsService
          .getStats([""], [{}], 2)
          .subscribe((stats: any) => {
            this.activityService.getConfigByName(activity.type)
              .subscribe((config: ActivityConfig) => {
                let maxResult = ReducedResultService.findByKeys(stats, new Map([[GroupType.ACTIVITY_TYPE, activity.type]]))[0].value.max;
                let factor = config.fitnessPointsFactor;
                this.activity = new ActivityResult(activity.type, activity.measure.value, activity.measure.value * factor);
                this.record = new ActivityResult(activity.type, maxResult, maxResult * factor);
              });
          });
      })
  }
}
