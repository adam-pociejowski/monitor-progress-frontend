import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../service/activity.service';
import { DocumentModel } from '../../../core/model/document.model';
import { Activity } from '../../model/activity.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activities: DocumentModel<Activity>[];

  constructor(private activityService: ActivityService) {
  }

  ngOnInit(): void {
    this.activityService
      .findOlderDocuments(10, null)
      .subscribe((activities: DocumentModel<Activity>[]) => {
        this.activities = activities;
        console.log('activities', this.activities);
      });
    this.activityService
      .findConfig()
      .subscribe(((s: any) => {
        console.log(s);
      }))
  }
}
