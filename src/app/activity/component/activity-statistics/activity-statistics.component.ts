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

  constructor(private activityStatisticsService: ActivityStatisticsService) {}

  ngOnInit(): void {
    this.activityStatisticsService
      .getFitnessPointsPerDay()
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
      })
  }

}
