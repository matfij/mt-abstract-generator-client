import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractModel } from './models';
import { GenerateAbstractParams } from './parameters';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private BASE_URL = environment.baseUrl;

  constructor(
    private httpClinet: HttpClient
  ) {}

  generateAbstract(params: GenerateAbstractParams, key: string): Observable<AbstractModel> {
    const url = this.BASE_URL + 'core/abstract/';
    return this.httpClinet.post<AbstractModel>(url, params, { headers: {'key': key} });
  }

}
