import { Period } from "../../core/model/period.enum";
import { GoalMeasure } from "../../core/model/goal.measure.enum";

export class ActivityGoal {

    constructor(public activityType: string,
                public period: Period,
                public goalMeasure: GoalMeasure,
                public goalAmount: number,
                public currentAmount: number) {}
}
