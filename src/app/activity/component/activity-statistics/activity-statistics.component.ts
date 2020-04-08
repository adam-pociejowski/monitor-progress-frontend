import { Component, OnInit } from '@angular/core';
import {ActivityStatisticsService} from "../../service/activity-statistics.service";

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
  numberOfDaysForStats = 7;

  constructor(private activityStatisticsService: ActivityStatisticsService) {}

  ngOnInit(): void {
    this.getFitnessPointsPerDay();
  }

  getFitnessPointsPerDay = () =>
    this.activityStatisticsService
      .getFitnessPointsPerDay(
        ActivityStatisticsService.getDateString(new Date(new Date().setDate(new Date().getDate() - this.numberOfDaysForStats + 1))),
        ActivityStatisticsService.getDateString(new Date()))
      .subscribe((data: any) => {
        console.log(data);
        this.data = [];
        for (let date in data) {
          this.data.push({
            name: date,
            value: data[date]
          })
        }
        console.log(this.data);
        this.view = [100 + this.data.length * 100, 400];
      });

  onIntervalChanged = () =>
    this.getFitnessPointsPerDay();
}
