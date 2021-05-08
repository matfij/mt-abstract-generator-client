import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private translateService: TranslateService,
    private toastrService: ToastrService
  ) {}

  enumToConst(enumObj, options?: { namePrepend?: string; valueProperty?: string; nameProperty?: string }): AppConstant[] {
    const defaultOptions = { namePrepend: '', valueProperty: 'value', nameProperty: 'name'};
    options = { ...defaultOptions, ...options };

    return Object.keys(enumObj).filter(item => isNaN(Number(item))).map(item => ({
      value: enumObj[item],
      name: this.translateService.instant(options.namePrepend + item),
    }));
  }

  presentToast(message: string, status: ToastStatus = ToastStatus.Info) {
    message = this.translateService.instant(message);

    switch (status) {
      case ToastStatus.Success: { this.toastrService.success(message); break; }
      case ToastStatus.Error: { this.toastrService.error(message); break; }
      case ToastStatus.Warning: { this.toastrService.warning(message); break; }
      case ToastStatus.Info: { this.toastrService.info(message); break; }
      case ToastStatus.Show: { this.toastrService.show(message); break; }
      default: { this.toastrService.info(message); break; }
    }

  }
}

export interface AppConstant {
  name: string;
  value: number;
}

export enum ToastStatus {
  Success,
  Error,
  Warning,
  Info,
  Show
}
