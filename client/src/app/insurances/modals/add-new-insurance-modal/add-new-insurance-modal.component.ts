import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapterService } from 'src/app/services/custom-adapter.service';
import { CustomDateParserFormatterService } from 'src/app/services/custom-date-parser-formatter.service';
import { InsuranceBindModel } from '../../models/insurance.bind.model';
import { InsurancesService } from '../../services/insurances.service';
import { ToastrService } from 'ngx-toastr';
import { Insurance } from '../../models/insurance.model';



function ValidatePersonalIdentifier(control: AbstractControl) {
  let isOnlyDigits = /^\d+$/.test(control.value);
  if (control.value.length == 10 || isOnlyDigits) {
    let sum = 0;
    let multipliers = [2, 4, 8, 5, 10, 9, 7, 3, 6];
    for (let index = 0; index < control.value.length; index++) {
      if (index < multipliers.length) {
        sum = sum + (parseInt(control.value[index]) * multipliers[index]);
      }
    }
    let lastNumber = sum - (Math.floor(sum / 11) * 11);
    if (control.value[control.value.length - 1] == lastNumber) {
      return null;
    }
  }
  return { invalidPersonalIdentifier: true };
}

const userNameRegex = "^(?!.{50,})(([a-zA-Z]+\\s+[a-zA-Z]+ ?)|([a-zA-Z]+\\s+[a-zA-Z]+\\s+[a-zA-Z]+ ?))$";

const carRegNumberRegex = "^([А-Я]{2}|[А-Я]{1})[0-9]{4}[А-Я]{2}$";

const onlyDigitsRegex = "^\\d+$";


@Component({
  selector: 'app-add-new-insurance-modal',
  templateUrl: './add-new-insurance-modal.component.html',
  styleUrls: ['./add-new-insurance-modal.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapterService },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService }
  ]
})
export class AddNewInsuranceModalComponent implements OnInit {
  insuranceForm: any;
  loading: any;
  isFormSubmitted: any;
  insuranceBindModel: InsuranceBindModel = new InsuranceBindModel();
  @Output() enteredInsurance = new EventEmitter();

  constructor(
    private insuranceService: InsurancesService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService) { }

  get ownerName() {
    return this.insuranceForm.get('ownerName');
  }

  get vehicleRegNumber() {
    return this.insuranceForm.get('vehicleRegNumber');
  }

  get personalIdentifier() {
    return this.insuranceForm.get('personalIdentifier');
  }

  get startDate() {
    return this.insuranceForm.get('startDate');
  }

  get paymentsCount() {
    return this.insuranceForm.get('paymentsCount');
  }

  get yearOfManufacture() {
    return this.insuranceForm.get('yearOfManufacture');
  }

  get insurancePrice() {
    return this.insuranceForm.get('insurancePrice');
  }

  get duePrice() {
    return this.insuranceForm.get('duePrice');
  }




  ngOnInit(): void {
    this.insuranceForm = new FormGroup({
      vehicleRegNumber: new FormControl('', [Validators.required, Validators.pattern(carRegNumberRegex)]),
      ownerName: new FormControl('', [Validators.required, Validators.pattern(userNameRegex)]),
      personalIdentifier: new FormControl('', [Validators.required, ValidatePersonalIdentifier]),
      startDate: new FormControl('', [Validators.required]),
      paymentsCount: new FormControl(null, [Validators.required, Validators.pattern(onlyDigitsRegex)]),
      yearOfManufacture: new FormControl(null, [Validators.required, Validators.pattern(onlyDigitsRegex)]),
      insurancePrice: new FormControl('', [Validators.required, Validators.pattern(onlyDigitsRegex)]),
      duePrice: new FormControl('', [Validators.required, Validators.pattern(onlyDigitsRegex)]),
    },
      { updateOn: 'blur' }
    );
  }

  closeModal() {
    this.activeModal.close();
    this.isFormSubmitted = false;
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (!this.loading && !this.insuranceForm.invalid) {
      const data = this.insuranceForm.getRawValue();
      this.insuranceForm.markAllAsTouched();
      const splittedDate = data.startDate.split('-');
      data.startDate = new Date(+splittedDate[2], +splittedDate[1] - 1, splittedDate[0]).toISOString();
      data.paymentsCount = +data.paymentsCount
      data.yearOfManufacture = +data.yearOfManufacture;
      data.insurancePrice = +data.insurancePrice;
      data.duePrice = +data.duePrice;
      this.loading = true;
      // this.insuranceBindModel = Object.assign(this.insuranceBindModel, data); // TO DO !!!!!!
      this.insuranceService.createNewInsurance(data).subscribe((response: Insurance) => {
        this.enteredInsurance.emit(response);
        this.loading = false;
        this.closeModal();
        this.toastr.success('Successfully added new insurance!', 'Insurance adding');
      }, (error: any) => {
        this.toastr.error(error.error.message, 'Insurance adding');
        this.closeModal();
      });
    }
  }
}
