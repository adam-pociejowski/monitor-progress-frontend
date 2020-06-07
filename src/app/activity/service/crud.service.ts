import { DocumentModel } from "../../core/model/document.model";
import { RestService } from "../../core/service/rest.service";

export abstract class CrudService<T> {

  protected constructor(protected restService: RestService,
                        private path: string) {}

  add = (element: T) =>
    this.restService
      .post(`${this.path}`, element);

  update = (updatedDocument: DocumentModel<T>) =>
    this.restService
      .put(`${this.path}`, updatedDocument);

  delete = (removedDocument: DocumentModel<T>) =>
    this.restService
      .delete(`${this.path}/${removedDocument.id}/${removedDocument.rev}`);
}
