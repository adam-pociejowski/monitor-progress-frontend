import { Component, Input, OnInit } from '@angular/core';
import { Goal } from "../../../../model/goal/goal.model";
import {DocumentModel} from "../../../../../core/model/document.model";

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {
  @Input() goals: DocumentModel<Goal>[];

  constructor() {}

  ngOnInit(): void {}
}
