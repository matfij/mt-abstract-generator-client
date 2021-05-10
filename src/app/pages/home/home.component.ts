import { Component, OnInit } from '@angular/core';
import { AbstractModel } from 'src/app/client/models';
import { GenerateAbstractParams } from 'src/app/client/parameters';
import { GENERATE_ABSTRACT_PARAMS, StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageState: HomePageState;
  abstract: AbstractModel;
  phrase: string;

  constructor(
    private storeService: StoreService
  ) {}

  get homePageState() { return HomePageState; }

  ngOnInit(): void {
    this.pageState = HomePageState.SearchForm;
  }

  handleAbstract(abstract: AbstractModel) {
    this.abstract = abstract;
    this.phrase = (this.storeService.getItem(GENERATE_ABSTRACT_PARAMS) as GenerateAbstractParams).phrase;
    this.pageState = HomePageState.PollForm;
  }

}

enum HomePageState {
  SearchForm,
  PollForm
}
