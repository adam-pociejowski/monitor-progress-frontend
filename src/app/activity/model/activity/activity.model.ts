import { Measure } from './measure.model';

export class Activity {

    constructor(public name: string,
                public datetime: string,
                public type: string,
                public measure: Measure,
                public fitnessPoints: number = 0,
                public metadata: any) {}
}
