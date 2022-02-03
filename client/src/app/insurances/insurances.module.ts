import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsurancesComponent } from './insurances/insurances.component';
import { RouterModule } from '@angular/router';
import { AddNewInsuranceModalComponent } from './modals/add-new-insurance-modal/add-new-insurance-modal.component';
import { InsurancesRoutingModule } from './insurances-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchFilterPipeModule } from '../pipes/search-filter.pipe';
import { SortByDatePipePipeModule } from '../pipes/sort-by-date.pipe';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    InsurancesComponent,
    AddNewInsuranceModalComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    SearchFilterPipeModule,
    SortByDatePipePipeModule,
    FormsModule,
    NgbModule,
    InsurancesRoutingModule,
    ReactiveFormsModule
  ]
})
export class InsurancesModule { }
