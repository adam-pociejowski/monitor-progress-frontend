import { Component, OnInit } from '@angular/core';
import { ActivityStatisticsService } from '../../service/activity-statistics.service';
import {ReducedResult} from "../../../core/model/reduced.stats.model";
import {DocumentStats} from "../../../core/model/document.stats.model";
import {ReducedResultService} from "../../../core/service/reduced.result.service";

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
        this.activityStatisticsService.prepareKey(new Date(new Date().setDate(new Date().getDate() - this.numberOfDaysForStats + 1))),
        this.activityStatisticsService.prepareKey(new Date()),
        5)
      .subscribe((reducedResults: ReducedResult<DocumentStats>[]) => {
        console.log(reducedResults);
        this.data = [];
        reducedResults
          .forEach((reducedResult: ReducedResult<DocumentStats>) => {
            this.data.push({
              name: ReducedResultService.mapToDateString(reducedResult, "dd/MM/YY"),
              value: reducedResult.value.sum
            });
          })
        this.view = [window.innerWidth - 50, 400];
      });

  onIntervalChanged = () =>
    this.getFitnessPointsPerDay();
}
