import { DocumentModel } from "../../core/model/document.model";
import { Activity } from "./activity.model";

export class DayActivities {
  constructor(public date: string,
              public activities: DocumentModel<Activity>[]) {
  }
}
