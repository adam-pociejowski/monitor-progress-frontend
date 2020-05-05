export class ReduceRequest {

  constructor(public groupLevel: number,
              public startKey: any[],
              public endKey: any[]) {}
}
