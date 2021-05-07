import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AnswerModel, SummaryModel } from 'src/app/core/config';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchForm = new FormGroup({
    key: new FormControl(''),
    phrase: new FormControl(''),
    pageNumber: new FormControl(''),
    answerModel: new FormControl(''),
    summaryModel: new FormControl(''),
  });
  isAdvancedChecked: boolean;

  constructor(
    private utilsService: UtilsService
  ) {}

  get AnswerModelEnum() { return this.utilsService.enumToConst(AnswerModel, {namePrepend: 'home.answerModelEnum.'}); }
  get SummaryModelEnum() { return this.utilsService.enumToConst(SummaryModel, {namePrepend: 'home.summaryModelEnum.'}); }

  ngOnInit(): void {
  }

  generateAbstract() {
    console.log(this.searchForm.controls.key.value)
    console.log(this.searchForm.controls.phrase.value)
    console.log(this.searchForm.controls.pageNumber.value)
    console.log(this.searchForm.controls.answerModel.value)
    console.log(this.searchForm.controls.summaryModel.value)
  }

}
