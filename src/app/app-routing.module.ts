import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignPageComponent } from './design-page/design-page.component';


const routes: Routes = [
  // { path: '', component: HComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
