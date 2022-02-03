import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewInsuranceModalComponent } from '../modals/add-new-insurance-modal/add-new-insurance-modal.component';
import { CustomHttpResponse } from '../models/custom-response.model';
import { Insurance, InsurancePayment } from '../models/insurance.model';
import { InsurancesService } from '../services/insurances.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-insurances',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.scss'],
})
export class InsurancesComponent implements OnInit {
  loading: boolean;
  insurances: Array<Insurance> = [];
  carRegistrationNumber: string;
  sortType: string;

  constructor(private modalService: NgbModal, private insuranceService: InsurancesService) { }

  ngOnInit(): void {
    this.loading = true;
    this.insuranceService.getAllInsurances().subscribe((response: Array<Insurance>) => {
      this.loading = false;
      this.insurances = response;
    })

  }
  openModal() {
    const modalRef = this.modalService.open(AddNewInsuranceModalComponent);
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.enteredInsurance.subscribe((x: any) => this.insurances.push(x));
  }

  payInsurance(insurance: Insurance, payment: InsurancePayment) {
    this.loading = true;
    this.insuranceService.payInsurance({ insuranceId: insurance._id, paymentNumber: payment.paymentNumber }).subscribe((response: CustomHttpResponse) => {
      this.loading = false;
      if (response.success) {
        payment.status = 'paid';
        payment.date = new Date();
      } else {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${response.message}`,
        })
      }
    });

  }


}
