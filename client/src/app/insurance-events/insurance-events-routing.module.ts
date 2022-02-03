import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceEventsComponent } from './insurance-events/insurance-events.component';

const routes: Routes = [
  {
    path : '',
    component: InsuranceEventsComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class InsuranceEventsRoutingModule { }
