import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesComponent } from './insurances/insurances.component';

const routes: Routes = [
  {
    path : '',
   component: InsurancesComponent,
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InsurancesRoutingModule { }
