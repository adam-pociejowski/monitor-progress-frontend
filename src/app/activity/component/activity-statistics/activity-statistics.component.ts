import { Component, OnInit } from '@angular/core';
import {ActivityStatisticsService} from "../../service/activity-statistics.service";
import {ShortDatePipe} from "../../../core/pipe/short.date.pipe";

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
  datePipe = new ShortDatePipe();

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
        this.data = [];
        for (let date in data) {
          this.data.push({
            name: this.datePipe.transform(date),
            value: data[date]
          })
        }
        this.view = [1070, 400];
      });

  onIntervalChanged = () =>
    this.getFitnessPointsPerDay();
}
