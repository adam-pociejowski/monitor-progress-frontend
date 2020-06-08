import { Component, Input, OnInit } from '@angular/core';
import { Goal } from "../../../../../model/goal/goal.model";
import { DocumentModel } from "../../../../../../core/model/document.model";

@Component({
  selector: 'app-goal-element',
  templateUrl: './goal-element.component.html',
  styleUrls: ['./goal-element.component.css']
})
export class GoalElementComponent implements OnInit {
  @Input() goal: DocumentModel<Goal>

  constructor() { }

  ngOnInit(): void {
    console.log(this.goal)
  }
}
