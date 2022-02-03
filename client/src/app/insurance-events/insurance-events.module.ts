import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceEventsComponent } from './insurance-events/insurance-events.component';
import { InsuranceEventsRoutingModule } from './insurance-events-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddNewInsuranceEventModalComponent } from './modals/add-new-insurance-event-modal/add-new-insurance-event-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipeModule } from '../pipes/search-filter.pipe';
import { SortByDatePipePipeModule } from '../pipes/sort-by-date.pipe';
import { AppCardLoaderComponent } from '../app-card-loader/app-card-loader.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    InsuranceEventsComponent,
    AddNewInsuranceEventModalComponent,
    
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NgbModule,
    SearchFilterPipeModule,
    SortByDatePipePipeModule,
    FormsModule,
    ReactiveFormsModule,
    InsuranceEventsRoutingModule
  ],
  exports:[InsuranceEventsComponent, AddNewInsuranceEventModalComponent]
})
export class InsuranceEventsModule { }
