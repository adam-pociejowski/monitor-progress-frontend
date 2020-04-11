export class DocumentModel<T> {
    constructor(public id: string,
                public rev: string,
                public value: T,
                public type: string) {}
}
