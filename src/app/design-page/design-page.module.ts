import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DesignPageComponent } from './design-page.component';
import { DesignPageService } from './services/design-page.service';

@NgModule({
  declarations: [
    DesignPageComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    DesignPageService
  ],
  exports: [
    DesignPageComponent
  ]
})
export class DesignPageModule { }
