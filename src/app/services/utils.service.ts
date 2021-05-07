import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EnumType } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private translateService: TranslateService
  ) {}

  enumToConst(enumObj, options?: { namePrepend?: string; valueProperty?: string; nameProperty?: string }): AppConstant[] {
    const defaultOptions = { namePrepend: '', valueProperty: 'value', nameProperty: 'name'};
    options = { ...defaultOptions, ...options };

    return Object.keys(enumObj).filter(item => isNaN(Number(item))).map(item => ({
      value: enumObj[item],
      name: this.translateService.instant(options.namePrepend + item),
    }));
  }
}

export interface AppConstant {
  name: string;
  value: number;
}
