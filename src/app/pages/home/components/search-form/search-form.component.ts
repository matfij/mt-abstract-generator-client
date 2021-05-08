import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MockClientService } from 'src/app/client/mock-client.service';
import { AbstractModel } from 'src/app/client/models';
import { GenerateAbstractParams } from 'src/app/client/parameters';
import { AnswerModel, DEFAULT_ANSWER_MODEL, DEFAULT_PAGE_NUMBER, DEFAULT_SUMMARY_MODEL, MAX_PAGE_NUMBER, MIN_KEY_LENGTH, MIN_PAGE_NUMBER, MIN_PHRASE_LENGTH, SummaryModel } from 'src/app/core/config';
import { ToastStatus, UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  @Output() abstract: EventEmitter<AbstractModel> = new EventEmitter<AbstractModel>();

  searchForm = new FormGroup({
    key: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
    phrase: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
    pageNumber: new FormControl(''),
    answerModel: new FormControl(''),
    summaryModel: new FormControl(''),
  });
  isAdvancedChecked: boolean;
  searchLoading: boolean;

  constructor(
    private apiClient: MockClientService,
    private utilsService: UtilsService,
  ) {}

  get minRange() { return MIN_PAGE_NUMBER; }
  get maxRange() { return MAX_PAGE_NUMBER; }
  get answerModelEnum() { return this.utilsService.enumToConst(AnswerModel, {namePrepend: 'home.answerModelEnum.'}); }
  get summaryModelEnum() { return this.utilsService.enumToConst(SummaryModel, {namePrepend: 'home.summaryModelEnum.'}); }

  ngOnInit(): void {}

  validateInputs(): boolean {
    if (this.searchForm.controls.key.value.length < MIN_KEY_LENGTH) {
      this.utilsService.presentToast('home.keyInvalid');
      return false;
    }
    if (this.searchForm.controls.phrase.value.length < MIN_PHRASE_LENGTH) {
      this.utilsService.presentToast('home.phraseInvalid');
      return false;
    }
    return true;
  }

  startLoading() {
    Object.keys(this.searchForm.controls).forEach(key => {
      this.searchForm.controls[key].disable();
    });
    this.searchLoading = true;
  }

  finishLoading() {
    Object.keys(this.searchForm.controls).forEach(key => {
      this.searchForm.controls[key].enable();
    });
    this.searchLoading = false;
  }

  generateAbstract() {
    if (!this.validateInputs()) return;
    this.startLoading();

    const key = this.searchForm.controls.key.value;
    const params: GenerateAbstractParams = {
      phrase: this.searchForm.controls.phrase.value,
      page_number: this.searchForm.controls.pageNumber.value ? this.searchForm.controls.pageNumber.value : DEFAULT_PAGE_NUMBER,
      answer_model: this.searchForm.controls.answerModel.value ? this.searchForm.controls.answerModel.value : DEFAULT_ANSWER_MODEL,
      summary_model: this.searchForm.controls.summaryModel.value ? this.searchForm.controls.summaryModel.value : DEFAULT_SUMMARY_MODEL,
    };

    this.apiClient.generateAbstract(params, key).subscribe((abstract: AbstractModel) => {
      this.utilsService.presentToast('home.abstractGenerated', ToastStatus.Success);
      this.abstract.next(abstract);
      this.finishLoading();
    }, error => {
      this.utilsService.presentToast('home.keyExpired');
      this.finishLoading();
    });
  }

}
