import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DesignPageComponent } from './design-page.component';
import { DesignPageService } from './services/design-page.service';
import { SafePipe } from './pipe/safe.pipe';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    DesignPageComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    DesignPageService
  ],
  exports: [
    DesignPageComponent
  ]
})
export class DesignPageModule { }
