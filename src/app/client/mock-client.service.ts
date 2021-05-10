import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AnswerModel, SummaryModel } from '../core/config';
import { AbstractModel, PollModel } from './models';
import { GenerateAbstractParams, PollParams } from './parameters';

@Injectable({
  providedIn: 'root'
})
export class MockClientService {

  constructor() {}

  generateAbstract(params: GenerateAbstractParams, key: string): Observable<AbstractModel> {
    console.log(key, params);

    const abstract: AbstractModel = {
      answer: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      summary: 'Suspendisse massa justo, aliquet ac erat vel, consectetur consequat ante. Suspendisse eu blandit erat. Nam at vulputate elit. Quisque tempus, metus blandit feugiat ultrices, felis mauris cursus leo, quis commodo tortor sem eu nisl. Ut sed nibh in dui tristique euismod. Integer blandit ut turpis a pellentesque. Curabitur a elementum tellus. Integer pharetra nunc rutrum lacus interdum, sed venenatis mauris tristique. Duis ante ligula, bibendum sed gravida vitae, blandit ac enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris pretium rutrum pharetra.'
    };

    return of(abstract);
  }

  submitPoll(params: PollParams, key: string): Observable<PollModel> {
    console.log(key, params);

    const poll: PollModel = {
      key: 'h72439d8j473j2d4d44d34mkjnrdkjbri3hcrh43oric3',
      date: '2021-05-08T11:38:35+00:00',
      phrase: 'Is coffee healthy?',
      answer_model: AnswerModel.ElectraSquad,
      summary_model: SummaryModel.DistillBartCnn,
      page_number: 44,
      answer_score: 3,
      summary_score: 5,
      time_score: 2,
      answer: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      summary: 'Suspendisse massa justo, aliquet ac erat vel, consectetur consequat ante. Suspendisse eu blandit erat. Nam at vulputate elit. Quisque tempus, metus blandit feugiat ultrices, felis mauris cursus leo, quis commodo tortor sem eu nisl. Ut sed nibh in dui tristique euismod. Integer blandit ut turpis a pellentesque. Curabitur a elementum tellus. Integer pharetra nunc rutrum lacus interdum, sed venenatis mauris tristique. Duis ante ligula, bibendum sed gravida vitae, blandit ac enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris pretium rutrum pharetra.',
      comment: 'Not too shabby :), but definitely lacks performance!'
    };

    return of(poll);
  }
}
