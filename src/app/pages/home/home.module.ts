import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CoreModule } from 'src/app/core/core.module';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { PollFormComponent } from './components/poll-form/poll-form.component';


@NgModule({
  declarations: [
    HomeComponent,
    SearchFormComponent,
    PollFormComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule
  ]
})
export class HomeModule { }
