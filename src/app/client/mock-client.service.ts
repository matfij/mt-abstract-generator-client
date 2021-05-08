import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbstractModel } from './models';
import { GenerateAbstractParams } from './parameters';

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
    }

    return of(abstract);
  }
}
