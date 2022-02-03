import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InsurancesService } from 'src/app/insurances/services/insurances.service';
import { AddNewInsuranceEventModalComponent } from '../modals/add-new-insurance-event-modal/add-new-insurance-event-modal.component';
import { combineLatest, Subscription } from 'rxjs';
import { InsuranceEventsService } from '../services/insurance-events.service';
import { FilterPipe } from 'src/app/pipes/search-filter.pipe';
import { ActivatedRoute } from '@angular/router';
import { InsuranceEvent } from '../models/insurance-event.model';
import { VehicleRegistrationNumber } from 'src/app/insurances/models/vehicle-registration-number.model';

@Component({
  selector: 'app-insurance-events',
  templateUrl: './insurance-events.component.html',
  styleUrls: ['./insurance-events.component.scss']
})
export class InsuranceEventsComponent implements OnInit, OnDestroy {

  insuredVehiclesRegNumbers: Array<VehicleRegistrationNumber>;
  insuranceEvents: Array<InsuranceEvent> = [];
  loading: boolean;
  subscription: Subscription;
  searchVehicleRegNum: any;
  selectedVehicle: VehicleRegistrationNumber | undefined;
  sortType: string;

  constructor
    (
      private insuranceService: InsurancesService,
      private modalService: NgbModal,
      private insuranceEventService: InsuranceEventsService,
      private filterPipe: FilterPipe,
      private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.loading = true;
    this.subscription = combineLatest(this.insuranceService.getAllVehicleNumbers(),
      this.insuranceEventService.gellAllInsuranceEvents()).subscribe(
        ([vehicleNumbers, insuranceEvents]) => {
          this.loading = false;
          this.insuredVehiclesRegNumbers = vehicleNumbers;
          this.insuranceEvents = insuranceEvents;
          this.route.params.subscribe((params: any) => {
            if (params['vehicleId']) {
              this.searchVehicleRegNum = params['vehicleId'];
              this.filterPipe.transform(this.insuredVehiclesRegNumbers, this.searchVehicleRegNum);
              this.selectedVehicle = this.insuredVehiclesRegNumbers.find(el => el.vehicleRegNumber === params['vehicleId']);
            }
          });
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openModal() {
    const modalRef = this.modalService.open(AddNewInsuranceEventModalComponent);
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.selectedVehicle = this.selectedVehicle;
    modalRef.componentInstance.enteredInsuranceEvent.subscribe((x: InsuranceEvent) => {
      this.insuranceEvents = [...this.insuranceEvents, x];
    });
  }

  selectVehicleNumber(vehicle: any) {
    this.selectedVehicle = vehicle;
  }

}
