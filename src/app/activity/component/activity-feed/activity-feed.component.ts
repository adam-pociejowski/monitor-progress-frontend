import {Component, OnInit} from '@angular/core';
import {ActivityService} from "../../service/activity.service";
import {Activity} from "../../model/activity.model";
import {DocumentModel} from "../../../core/model/document.model";
import {faEdit, faSkull} from '@fortawesome/free-solid-svg-icons';
import {DayActivities} from "../../model/day.activities.model";
import {ShortDatePipe} from "../../../core/pipe/short.date.pipe";
import {ToastService} from "../../../core/service/toast.service";
import {Router} from "@angular/router";
import {ActivityStatisticsService} from "../../service/activity-statistics.service";
import {GroupType} from "../../../core/model/group.type.enum";
import {DocumentStats} from "../../../core/model/document.stats.model";
import {ReducedResult} from "../../../core/model/reduced.stats.model";

@Component({
  selector: 'app-activity-feed',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.css']
})
export class ActivityFeedComponent implements OnInit {
  pageSize = 10;
  faEdit = faEdit;
  faSkull = faSkull;
  stats: any;
  dayActivitiesList: DayActivities[] = [];
  datePipe = new ShortDatePipe();

  constructor(public activityStatisticsService: ActivityStatisticsService,
              private activityService: ActivityService,
              private toastService: ToastService,
              private router: Router) {}

  ngOnInit(): void {
    this.findNextPageOfActivities();
    this.activityStatisticsService
      .getStats([""], [{}], 2)
      .subscribe((stats: any) => { this.stats = stats; console.log(stats);} )
  }

  getMaxForActivityType = (activityType: string): ReducedResult<DocumentStats> =>
    this.activityStatisticsService.findByKeys(this.stats, new Map([[GroupType.ACTIVITY_TYPE, activityType]]));

  onActivityDeleted = (dayActivities: DayActivities,
                       activity: DocumentModel<Activity>) =>
    this.activityService.delete(activity)
      .subscribe(() => {
        dayActivities.activities.splice(dayActivities.activities.indexOf(activity), 1);
        if (dayActivities.activities.length == 0) {
          this.dayActivitiesList.splice(this.dayActivitiesList.indexOf(dayActivities), 1);
        }
        this.toastService.info(`Activity ${activity.value.name} successfully removed`)
      });

  onActivityEdit = (activity: DocumentModel<Activity>) => {
    this.activityService.editingActivity = activity;
    this.router.navigate(['activity/edit']);
  }

  findNextPageOfActivities = () =>
    this.activityService
      .findOlderDocuments(this.pageSize, ActivityFeedComponent.getDateFromOldestActivity(this.dayActivitiesList))
      .subscribe((activities: DocumentModel<Activity>[]) =>
        activities
          .forEach(activity => this.appendActivity(activity)));

  private appendActivity(activity: DocumentModel<Activity>) {
    let date = this.datePipe
      .transform(activity.value.datetime);
    let dayActivities: DayActivities = this.findDayActivity(date);
    if (dayActivities == undefined) {
      dayActivities = new DayActivities(date, [activity]);
      this.dayActivitiesList.push(dayActivities);
    } else {
      dayActivities.activities.push(activity);
    }
  }

  private findDayActivity = (date: string) =>
    this.dayActivitiesList
      .find(x => x.date === date);

  private static getDateFromOldestActivity(dayActivitiesList:  DayActivities[]) {
    if (dayActivitiesList.length == 0) {
      return new Date().toISOString();
    }
    let activities = dayActivitiesList[dayActivitiesList.length - 1].activities;
    return activities[activities.length - 1].value.datetime;
  }
}
