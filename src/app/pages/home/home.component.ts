import { Component, OnInit } from '@angular/core';
import { AbstractModel } from 'src/app/client/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageState: HomePageState;
  abstract: AbstractModel;

  constructor() {}

  get homePageState() { return HomePageState; }

  ngOnInit(): void {
    this.pageState = HomePageState.SearchForm;
  }

  handleAbstract(abstract: AbstractModel) {
    this.abstract = abstract;
    this.pageState = HomePageState.PollForm;
  }

}

enum HomePageState {
  SearchForm,
  PollForm
}
