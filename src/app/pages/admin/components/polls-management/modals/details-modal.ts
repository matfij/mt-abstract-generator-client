import { Component, Inject } from "@angular/core";
import { PollModel } from "src/app/client/models";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-data-example-dialog',
  template: `
  <h3 mat-dialog-title>
    {{ ('admin.phrase' | translate) + ': ' + poll.phrase }}
  </h3>

  <div mat-dialog-content>
    <table class="table table-dark">
      <tbody>
        <tr>
          <td>{{ 'home.answer' | translate }}</td>
          <td class="text-justify">{{ poll.answer }}</td>
        </tr>
        <tr>
          <td>{{ 'home.summary' | translate }}</td>
          <td class="text-justify">{{ poll.summary }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
})
export class PollDetailsModal {
  constructor(@Inject(MAT_DIALOG_DATA) public poll: PollModel) {}
}
