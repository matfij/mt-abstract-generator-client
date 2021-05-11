import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/client/api-client.service';
import { AbstractModel, PollModel } from 'src/app/client/models';
import { GenerateAbstractParams, PollParams } from 'src/app/client/parameters';
import { DEFAULT_SCORE, MAX_COMMENT_LENGTH, MAX_SCORE, MIN_SCORE } from 'src/app/core/config';
import { ABSTRACT_MODEL, AUTH_KEY, GENERATE_ABSTRACT_PARAMS, POLL_PARAMS, StoreService } from 'src/app/services/store.service';
import { ToastStatus, UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.scss']
})
export class PollFormComponent implements OnInit {

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchForm = new FormGroup({
    answerScore: new FormControl('', { validators: [Validators.required] }),
    summaryScore: new FormControl('', { validators: [Validators.required] }),
    timeScore: new FormControl('', { validators: [Validators.required] }),
    comment: new FormControl('', { validators: [Validators.maxLength(MAX_COMMENT_LENGTH) ]})
  });
  pollLoading: boolean;

  key: string;
  generateAbstractParams: GenerateAbstractParams;
  abstractModel: AbstractModel;

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

    this.searchForm.controls.answerScore.setValue(DEFAULT_SCORE);
    this.searchForm.controls.summaryScore.setValue(DEFAULT_SCORE);
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
      answer_score: this.searchForm.controls.answerScore.value,
      summary_score: this.searchForm.controls.summaryScore.value,
      time_score: this.searchForm.controls.timeScore.value,
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
