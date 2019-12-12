import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DesignPageComponent } from './design-page.component';
import { DesignPageService } from './services/design-page.service';
import { SafePipe } from './pipe/safe.pipe';
import { MatIconModule, MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DesignPageComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    FormsModule
  ],
  providers: [
    DesignPageService
  ],
  exports: [
    DesignPageComponent
  ]
})
export class DesignPageModule { }
