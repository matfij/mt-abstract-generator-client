import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractModel, PollModel } from './models';
import { GenerateAbstractParams, PollParams } from './parameters';

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

  submitPoll(params: PollParams, key: string): Observable<PollModel> {
    const url = this.BASE_URL + 'polls/';
    return this.httpClinet.post<PollModel>(url, params, { headers: {'key': key} });
  }

}
