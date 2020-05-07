import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-panel',
  templateUrl: './goal-panel.component.html',
  styleUrls: ['./goal-panel.component.css']
})
export class GoalPanelComponent implements OnInit {
  goalAddIconClicked = false;

  constructor() {}

  ngOnInit(): void {}

  onGoalAddIconClicked = () => {
    this.goalAddIconClicked = !this.goalAddIconClicked;
  }
}
