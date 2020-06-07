import { DocumentModel } from "../../core/model/document.model";
import { RestService } from "../../core/service/rest.service";
import 'rxjs/add/operator/map';

export abstract class CrudService<T> {

  protected constructor(protected restService: RestService,
                        private path: string) {}

  findAll = () =>
    this.restService
      .get(`${this.path}`)
      .map((data: any[]) => data.map((item: any) => this.mapToDocument(item)));

  add = (element: T) =>
    this.restService
      .post(`${this.path}`, element);

  update = (updatedDocument: DocumentModel<T>) =>
    this.restService
      .put(`${this.path}`, updatedDocument);

  delete = (removedDocument: DocumentModel<T>) =>
    this.restService
      .delete(`${this.path}/${removedDocument.id}/${removedDocument.rev}`);

  abstract mapToObject(obj: any) : T;

  protected mapToDocument = (element: any): DocumentModel<T> =>
    new DocumentModel<T>(
      element.id,
      element.rev,
      this.mapToObject(element.value),
      element.type
    );
}
