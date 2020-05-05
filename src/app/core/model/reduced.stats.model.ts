import {GroupType} from "./group.type.enum";

export class ReducedResult<T> {
    constructor(public groupMap: Map<GroupType, string>,
                public value: T) {}
}
