import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CoreModule } from 'src/app/core/core.module';
import { SearchFormComponent } from './components/search-form/search-form.component';


@NgModule({
  declarations: [
    HomeComponent,
    SearchFormComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule
  ]
})
export class HomeModule { }
