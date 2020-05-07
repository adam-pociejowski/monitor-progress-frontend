import { Component, Input, OnInit } from '@angular/core';
import { ActivityGoal } from "../../../../../model/activity-goal.model";

@Component({
  selector: 'app-goal-element',
  templateUrl: './goal-element.component.html',
  styleUrls: ['./goal-element.component.css']
})
export class GoalElementComponent implements OnInit {
  @Input()
  goal: ActivityGoal

  constructor() { }

  ngOnInit(): void {}
}
