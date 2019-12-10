import { NgModule } from '@angular/core';

import { MatButtonModule, MatGridListModule, MatExpansionModule, MatToolbarModule, MatListModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatRadioModule, MatTabsModule, MatSliderModule, MatTableModule } from '@angular/material'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

const MaterialComponents = [
    DragDropModule,
    MatSliderModule,
    MatButtonModule,
    MatGridListModule,
    MatExpansionModule,
    MatToolbarModule,
    MatListModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PortalModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule
];

@NgModule({
    imports: [MaterialComponents],
    exports: [MaterialComponents],
})
export class MaterialModule { }