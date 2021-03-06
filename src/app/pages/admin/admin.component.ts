import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: []
})
export class AdminComponent implements OnInit {

  pageState: AdminPageState;

  constructor() {}

  get adminPageState() { return AdminPageState; }

  ngOnInit(): void {
    this.pageState = AdminPageState.Unauthenticated;
  }

  onAuthentication() {
    this.pageState = AdminPageState.KeysManagement;
  }

  onPageStateChanges(nextState: AdminPageState) {
    this.pageState = nextState;
  }

}

export enum AdminPageState {
  Unauthenticated,
  KeysManagement,
  PollsManagement
}
