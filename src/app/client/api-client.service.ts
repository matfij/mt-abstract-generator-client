import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractModel, KeyModel, PollModel, ResponseMessage } from './models';
import { GenerateAbstractParams, PollParams } from './parameters';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private BASE_URL = environment.baseUrl;

  constructor(
    private httpClinet: HttpClient
  ) {}

  /**
   * Abstract
   */

  generateAbstract(params: GenerateAbstractParams, key: string): Observable<AbstractModel> {
    const url = this.BASE_URL + 'core/abstract/';
    return this.httpClinet.post<AbstractModel>(url, params, { headers: {'key': key} });
  }

  /**
   * Polls
   */

  submitPoll(params: PollParams, key: string): Observable<PollModel> {
    const url = this.BASE_URL + 'polls/';
    return this.httpClinet.post<PollModel>(url, params, { headers: {'key': key} });
  }

  getPolls(key: string): Observable<PollModel[]> {
    const url = this.BASE_URL + 'polls-admin/';
    return this.httpClinet.get<PollModel[]>(url, { headers: {'secret-key': key} });
  }

  deletePoll(id: number, key: string): Observable<ResponseMessage> {
    const url = this.BASE_URL + 'polls-admin/' + id + '/';
    return this.httpClinet.delete<ResponseMessage>(url, { headers: {'secret-key': key} });
  }

  /**
   * Keys
   */

  createKey(params: KeyModel, key: string): Observable<KeyModel> {
    const url = this.BASE_URL + 'core/key/';
    return this.httpClinet.post<KeyModel>(url, params, { headers: {'secret-key': key} });
  }

  getKeys(key: string): Observable<KeyModel[]> {
    const url = this.BASE_URL + 'core/key/';
    return this.httpClinet.get<KeyModel[]>(url, { headers: {'secret-key': key} });
  }

  updateKey(params: KeyModel, key: string): Observable<KeyModel> {
    const url = this.BASE_URL + 'core/key/' + params.id + '/';
    return this.httpClinet.put<KeyModel>(url, params, { headers: {'secret-key': key} });
  }

  deleteKey(id: number, key: string): Observable<ResponseMessage> {
    const url = this.BASE_URL + 'core/key/' + id + '/';
    return this.httpClinet.delete<ResponseMessage>(url, { headers: {'secret-key': key} });
  }

}
