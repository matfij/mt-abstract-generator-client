import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CoreModule } from 'src/app/core/core.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { KeysManagementComponent } from './components/keys-management/keys-management.component';
import { PollsManagementComponent } from './components/polls-management/polls-management.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';


@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent,
    KeysManagementComponent,
    PollsManagementComponent,
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule
  ]
})
export class AdminModule { }
