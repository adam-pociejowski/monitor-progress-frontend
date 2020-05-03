import { Component, OnInit } from '@angular/core';
import { ActivityStatisticsService } from '../../service/activity-statistics.service';

@Component({
  selector: 'app-activity-statistics',
  templateUrl: './activity-statistics.component.html',
  styleUrls: ['./activity-statistics.component.css']
})
export class ActivityStatisticsComponent implements OnInit {
  data: any[];
  view: any[] = [700, 400];
  colorScheme = {
    domain: ['#5AA454']
  };
  numberOfDaysForStats = 14;

  constructor(private activityStatisticsService: ActivityStatisticsService) {}

  ngOnInit(): void {
    this.getFitnessPointsPerDay();
  }

  getFitnessPointsPerDay = () =>
    this.activityStatisticsService
      .getFitnessPoints(
        this.activityStatisticsService.prepareKey('', new Date(new Date().setDate(new Date().getDate() - this.numberOfDaysForStats + 1))),
        this.activityStatisticsService.prepareKey({}, new Date()),
        5)
      .subscribe((data: any) => {
        this.data = [];
        let dataMap = new Map<string, number>();
        data
          .forEach((value, key) => {
            value
              .forEach((stats) => {
                if (dataMap.has(key)) {
                  dataMap.set(key, dataMap.get(key) + stats.sum);
                } else {
                  dataMap.set(key, stats.sum);
                }
              });
          });
        dataMap.forEach((value, key) => {
          this.data.push({
            name: key,
            value: value
          });
        });
        this.view = [1070, 400];
      });

  onIntervalChanged = () =>
    this.getFitnessPointsPerDay();
}
