import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapterService } from 'src/app/services/custom-adapter.service';
import { CustomDateParserFormatterService } from 'src/app/services/custom-date-parser-formatter.service';
import { InsuranceEventsService } from '../../services/insurance-events.service';
import swal from 'sweetalert2';
import { InsuranceEvent } from '../../models/insurance-event.model';
import { VehicleRegistrationNumber } from 'src/app/insurances/models/vehicle-registration-number.model';
import { CustomHttpResponse } from 'src/app/insurances/models/custom-response.model';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-add-new-insurance-event-modal',
  templateUrl: './add-new-insurance-event-modal.component.html',
  styleUrls: ['./add-new-insurance-event-modal.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapterService },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService }
  ]
})
export class AddNewInsuranceEventModalComponent implements OnInit {
  insuranceEventForm: FormGroup;
  loading: boolean;
  @Output() enteredInsuranceEvent = new EventEmitter<InsuranceEvent>();
  @Input() selectedVehicle: VehicleRegistrationNumber;
  imageData: string;


  constructor(
    private insuranceEventsService: InsuranceEventsService,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.insuranceEventForm = new FormGroup({
      insurance: new FormControl(this.selectedVehicle._id),
      vehicleRegNumber: new FormControl(this.selectedVehicle.vehicleRegNumber, [Validators.required]),
      eventDate: new FormControl('', [Validators.required]),
      driver: new FormControl('', [Validators.required]),
      eventInfo: new FormControl(''),
      image: new FormControl(null, [Validators.required])
    });
  }

  get eventDate() {
    return this.insuranceEventForm.get('eventDate');
  }

  get driver() {
    return this.insuranceEventForm.get('driver');
  }

  get eventInfo() {
    return this.insuranceEventForm.get('eventInfo');
  }

  get image() {
    return this.insuranceEventForm.get('image');
  }




  closeModal() {
    this.activeModal.close();
  }
  onFileSelect(event: Event) {
    const htmlInputEl: any = (event.target as HTMLInputElement);
    if (!!htmlInputEl) {
      const file = htmlInputEl.files[0];
      this.insuranceEventForm.get('image')?.setValue(file);
      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        this.insuranceEventForm.get('image')?.setErrors({ incorrectFileFormat: true })
      }
    }
  }

  onSubmit() {
    if (!this.loading && !this.insuranceEventForm.invalid) {
      const data = this.insuranceEventForm.getRawValue();
      this.insuranceEventForm.markAllAsTouched();
      this.loading = true;
      const splittedDate = data.eventDate.split('-');
      data.eventDate = new Date(+splittedDate[2], +splittedDate[1] - 1, splittedDate[0]).toISOString();
      this.insuranceEventsService.createNewEvent(data, this.insuranceEventForm.value.image).subscribe((response: InsuranceEvent) => {
        this.enteredInsuranceEvent.emit(response);
        this.toastr.success('Successfully added new insurance event!', 'Insurance event adding');
        this.closeModal();
        this.loading = false;
      }, (error: any) => {
        if (error.status === 422) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.error.message}`,
          })
        }
        this.toastr.error(error.error.message, 'Insurance event adding');
        this.closeModal();
        this.loading = false;
      });

    }

  }

}
