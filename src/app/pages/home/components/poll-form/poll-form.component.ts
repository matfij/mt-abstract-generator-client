import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/client/api-client.service';
import { AbstractModel, PollModel } from 'src/app/client/models';
import { GenerateAbstractParams, PollParams } from 'src/app/client/parameters';
import { DEFAULT_SCORE, MAX_COMMENT_LENGTH, MAX_SCORE, MIN_SCORE } from 'src/app/core/config';
import { ABSTRACT_MODEL, AUTH_KEY, EXECUTION_TIME, GENERATE_ABSTRACT_PARAMS, POLL_PARAMS, StoreService } from 'src/app/services/store.service';
import { ToastStatus, UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.scss']
})
export class PollFormComponent implements OnInit {

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchForm = new FormGroup({
    answerScoreLogical: new FormControl('', { validators: [Validators.required] }),
    answerScoreGrammatical: new FormControl('', { validators: [Validators.required] }),
    summaryScoreLogical: new FormControl('', { validators: [Validators.required] }),
    summaryScoreGrammatical: new FormControl('', { validators: [Validators.required] }),
    timeScore: new FormControl('', { validators: [Validators.required] }),
    comment: new FormControl('', { validators: [Validators.maxLength(MAX_COMMENT_LENGTH) ]})
  });
  pollLoading: boolean;

  key: string;
  generateAbstractParams: GenerateAbstractParams;
  abstractModel: AbstractModel;
  executionTime: number;

  constructor(
    private apiClient: ApiClientService,
    private utilsService: UtilsService,
    private storeService: StoreService
  ) {}

  get minRange() { return MIN_SCORE; }
  get maxRange() { return MAX_SCORE; }
  get defaultScore() { return DEFAULT_SCORE; }

  ngOnInit(): void {
    this.key = this.storeService.getSimpleItem(AUTH_KEY);
    this.generateAbstractParams = this.storeService.getItem(GENERATE_ABSTRACT_PARAMS);
    this.abstractModel = this.storeService.getItem(ABSTRACT_MODEL);
    this.executionTime = +this.storeService.getItem(EXECUTION_TIME);

    this.searchForm.controls.answerScoreLogical.setValue(DEFAULT_SCORE);
    this.searchForm.controls.answerScoreGrammatical.setValue(DEFAULT_SCORE);
    this.searchForm.controls.summaryScoreLogical.setValue(DEFAULT_SCORE);
    this.searchForm.controls.summaryScoreGrammatical.setValue(DEFAULT_SCORE);
    this.searchForm.controls.timeScore.setValue(DEFAULT_SCORE);
  }

  validateInputs() {
    if (!this.searchForm.controls.comment.valid) {
      this.utilsService.presentToast('home.commentInvalid');
      return false;
    }
    return true;
  }

  startLoading() {
    Object.keys(this.searchForm.controls).forEach(key => {
      this.searchForm.controls[key].disable();
    });
    this.pollLoading = true;
  }

  finishLoading() {
    Object.keys(this.searchForm.controls).forEach(key => {
      this.searchForm.controls[key].enable();
    });
    this.pollLoading = false;
  }

  submitPoll() {
    if (!this.validateInputs()) return;
    this.startLoading();

    const params: PollParams = {
      key: this.key,
      phrase: this.generateAbstractParams.phrase,
      answer_model: this.generateAbstractParams.answer_model,
      summary_model: this.generateAbstractParams.summary_model,
      page_number: this.generateAbstractParams.page_number,
      answer_score_logical: this.searchForm.controls.answerScoreLogical.value,
      answer_score_grammatical: this.searchForm.controls.answerScoreGrammatical.value,
      summary_score_logical: this.searchForm.controls.summaryScoreLogical.value,
      summary_score_grammatical: this.searchForm.controls.summaryScoreGrammatical.value,
      time_score: this.searchForm.controls.timeScore.value,
      execution_time: this.executionTime,
      answer: this.abstractModel.answer,
      summary: this.abstractModel.summary,
      comment: this.searchForm.controls.comment.value ? this.searchForm.controls.comment.value : ''
    };

    this.storeService.setItem(POLL_PARAMS, params);

    this.apiClient.submitPoll(params, this.key).subscribe((_: PollModel) => {
      this.utilsService.presentToast('home.pollSubmitted', ToastStatus.Success);
      this.close.next(true);
      this.finishLoading();
    }, error => {
      this.utilsService.presentToast('home.keyExpired');
      console.log(error);
      this.finishLoading();
    });
  }

}
