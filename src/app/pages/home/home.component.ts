import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageState: HomePageState;

  constructor() {}

  get homePageState() { return HomePageState; }

  ngOnInit(): void {
    this.pageState = HomePageState.SearchForm;
  }

  handleAbstract(event: any) {
    this.pageState = HomePageState.PollForm;
    console.log(event);
  }

}

enum HomePageState {
  SearchForm,
  PollForm
}
