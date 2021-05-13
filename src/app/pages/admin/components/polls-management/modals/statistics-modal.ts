import { Component, Inject } from "@angular/core";
import { PollModel, PollsStatistics } from "src/app/client/models";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-data-example-dialog',
  template: `
  <h3 mat-dialog-title>{{ 'admin.pollsStatistics' | translate }}</h3>
  <div mat-dialog-content>
    <table class="table table-striped table-dark">
      <tbody>
        <tr>
          <td scope="col text-muted">{{ 'admin.meanPageNumber' | translate }}</td>
          <td scope="col">{{ 'admin.meanAnswerScoreLogical' | translate }}</td>
          <td scope="col">{{ 'admin.meanAnswerScoreGrammatical' | translate }}</td>
          <td scope="col">{{ 'admin.meanSummaryScoreLogical' | translate }}</td>
          <td scope="col">{{ 'admin.meanSummaryScoreGrammatical' | translate }}</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>{{ data.meanPageNumber }}</td>
          <td>{{ data.meanAnswerScoreLogical }}</td>
          <td>{{ data.meanAnswerScoreGrammatical }}</td>
          <td>{{ data.meanSummaryScoreLogical }}</td>
          <td>{{ data.meanSummaryScoreGrammatical }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
})
export class PollsStatisticsModal {
  constructor(@Inject(MAT_DIALOG_DATA) public data: PollsStatistics) {}
}
