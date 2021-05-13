import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ApiClientService } from 'src/app/client/api-client.service';
import { PollModel, PollsStatistics } from 'src/app/client/models';
import { DATE_FORMAT } from 'src/app/core/config';
import { SECRET_KEY, StoreService } from 'src/app/services/store.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PollDetailsModal } from './modals/details-modal';
import { PollsStatisticsModal } from './modals/statistics-modal';

@Component({
  selector: 'app-polls-management',
  templateUrl: './polls-management.component.html',
  styleUrls: ['./polls-management.component.scss']
})
export class PollsManagementComponent implements OnInit {

  secretKey: string;
  polls: PollModel[] = [];
  tableLoading: boolean;

  @ViewChild('pollsTable', { static: false }) pollsTable: AgGridAngular;
  tableOptions = {
    'enableCellTextSelection': true
  };
  columnDefs = [];
  rowData = [];

  constructor(
    private apiClient: ApiClientService,
    private storeService: StoreService,
    private utilsService: UtilsService,
    private translateService: TranslateService,
    private datePipe: DatePipe,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.secretKey = this.storeService.getSimpleItem(SECRET_KEY);
    this.setupColumns();
  }

  setupColumns() {
    this.columnDefs = [
      { headerName: 'admin.id', field: 'id', filter: 'agNumberColumnFilter', checkboxSelection: true, width: 100 },
      { headerName: 'admin.key', field: 'key', width: 150 },
      { headerName: 'admin.phrase', field: 'phrase', filter: true,  width: 150 },
      { headerName: 'admin.pageNumber', field: 'pageNumber', filter: true,  width: 100 },
      { headerName: 'admin.creationDate', field: 'creationDate', filter: 'agDateColumnFilter', width: 150 },
      // { headerName: 'admin.answerModel', field: 'answerModel', filter: true,  width: 100 },
      // { headerName: 'admin.summaryModel', field: 'summaryModel', filter: true,  width: 100 },
      { headerName: 'admin.answerScoreLogical', field: 'answerScoreLogical', width: 100 },
      { headerName: 'admin.answerScoreGrammatical', field: 'answerScoreGrammatical', width: 100 },
      { headerName: 'admin.summaryScoreLogical', field: 'summaryScoreLogical', filter: true,  width: 100 },
      { headerName: 'admin.summaryScoreGrammatical', field: 'summaryScoreGrammatical', filter: true,  width: 100 },
      { headerName: 'admin.timeScore', field: 'timeScore', filter: 'agNumberColumnFilter', width: 100 },
      { headerName: 'admin.comment', field: 'comment', filter: 'agNumberColumnFilter', width: 200 }
    ];

    this.columnDefs.forEach(column => {
      column.headerName = this.translateService.instant(column.headerName);
      column.sortable = true;
      column.resizable = true;
    });
  }

  startTableLoading() {
    this.rowData = [];
    this.tableLoading = true;
    this.pollsTable.api.showLoadingOverlay();
  }

  stopTableLoading() {
    this.tableLoading = false;
    this.pollsTable.api.hideOverlay();
  }

  getPolls() {
    this.startTableLoading();

    this.apiClient.getPolls(this.secretKey).subscribe((polls: PollModel[]) => {
      this.polls = polls;
      let rows = [];
      polls.forEach((poll: PollModel) => {
        rows.push({
          id: poll.id,
          key: poll.key,
          phrase: poll.phrase,
          pageNumber: poll.page_number,
          creationDate: this.datePipe.transform(poll.date, DATE_FORMAT),
          answerScoreLogical: poll.answer_score_logical,
          answerScoreGrammatical: poll.answer_score_grammatical,
          summaryScoreLogical: poll.summary_score_logical,
          summaryScoreGrammatical: poll.summary_score_grammatical,
          timeScore: poll.time_score,
          comment: poll.comment,
          answerModel: poll.answer_model,
          summaryModel: poll.summary_model,
          answer: poll.answer,
          summary: poll.summary
        });
      });
      this.rowData = rows;
      this.stopTableLoading();
    }, error => {
      const message = JSON.stringify(error.error);
      this.utilsService.presentToast(message);
      this.stopTableLoading();
    })
  }

  showDetails() {
    const poll = this.pollsTable.api.getSelectedRows()[0];
    if (!poll) return;

    this.matDialog.open(PollDetailsModal, { data: poll });
  }

  deletePoll() {
    const key = this.pollsTable.api.getSelectedRows()[0];
    if (!key) return;

    this.startTableLoading();
    this.apiClient.deletePoll(key.id, this.secretKey).subscribe(_ => {
      this.utilsService.presentToast('admin.pollDeleted');
      this.getPolls();
    }, error => {
      const message = JSON.stringify(error.error)
      this.utilsService.presentToast(message);
      this.stopTableLoading();
    });
  }

  calculateStatistics() {
    if (this.polls.length === 0) return;

    const pageNumbers = this.polls.map(p => p.page_number);
    const answerScoresLogical = this.polls.map(p => p.answer_score_logical);
    const answerScoresGrammatical = this.polls.map(p => p.answer_score_grammatical);
    const summaryScoresLogical = this.polls.map(p => p.summary_score_logical);
    const summaryScoresGrammatical = this.polls.map(p => p.summary_score_grammatical);

    const pageNumberMean = pageNumbers.reduce((sum, current) => sum + current, 0) / pageNumbers.length;
    const answerScoreLogicalMean = answerScoresLogical.reduce((sum, current) => sum + current, 0) / answerScoresLogical.length;
    const answerScoreGrammaticalMean = answerScoresGrammatical.reduce((sum, current) => sum + current, 0) / answerScoresGrammatical.length;
    const summaryScoreLogicalMean = summaryScoresLogical.reduce((sum, current) => sum + current, 0) / summaryScoresLogical.length;
    const summaryScoreGrammaticalMean = summaryScoresGrammatical.reduce((sum, current) => sum + current, 0) / summaryScoresGrammatical.length;

    const pollsStatistics: PollsStatistics = {
      meanPageNumber: pageNumberMean,
      meanAnswerScoreLogical: answerScoreLogicalMean,
      meanAnswerScoreGrammatical: answerScoreGrammaticalMean,
      meanSummaryScoreLogical: summaryScoreLogicalMean,
      meanSummaryScoreGrammatical: summaryScoreGrammaticalMean
    };

    this.matDialog.open(PollsStatisticsModal, { data: pollsStatistics });
  }

}
