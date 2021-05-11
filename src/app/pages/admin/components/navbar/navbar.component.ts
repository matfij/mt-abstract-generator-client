import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminPageState } from '../../admin.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() pageState: EventEmitter<AdminPageState> = new EventEmitter<AdminPageState>();

  navbarState: AdminPageState;

  constructor() {}

  get adminPageState() { return AdminPageState; }

  ngOnInit(): void {
    this.navbarState = AdminPageState.KeysManagement;
    this.navigate(AdminPageState.KeysManagement);
  }

  navigate(nextState: AdminPageState) {
    this.navbarState = nextState;
    this.pageState.next(nextState);
  }

}
