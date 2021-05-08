import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { FooterComponent } from '../components/footer/footer.component';


const CHILD_PROVIDERS = [
  ...TranslateModule.forChild().providers
];

@NgModule({
  declarations: [
    SpinnerComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  exports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule,
    SpinnerComponent,
    FooterComponent
  ]
})
export class CoreModule {

  public static forChild(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...CHILD_PROVIDERS
      ]
    };
  }
}
