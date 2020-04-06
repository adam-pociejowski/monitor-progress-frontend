import {Component, Input, OnInit} from '@angular/core';
import {ActivityResult} from "../../model/activity.result.model";

@Component({
  selector: 'app-activity-result',
  templateUrl: './activity.result.component.html',
  styleUrls: ['./activity.result.component.css']
})
export class ActivityResultComponent implements OnInit {
  @Input() result: ActivityResult;
  @Input() header: string;

  ngOnInit(): void {
  }
}
