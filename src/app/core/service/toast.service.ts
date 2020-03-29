import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastrService: ToastrService) {
  }

  success(message?: string, title?: string, override?: Partial<IndividualConfig>) {
    this.toastrService.success(message, title, override);
  }

  error(message?: string, title?: string, override?: Partial<IndividualConfig>) {
    this.toastrService.error(message, title, override);
  }

  info(message?: string, title?: string, override?: Partial<IndividualConfig>) {
    this.toastrService.info(message, title, override);
  }

  warning(message?: string, title?: string, override?: Partial<IndividualConfig>) {
    this.toastrService.warning(message, title, override);
  }
}
