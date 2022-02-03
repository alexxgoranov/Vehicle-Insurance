import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsurancePaymentBindModel } from '../models/insurance-payment.bind.model';
import { Insurance } from '../models/insurance.model';
import { VehicleRegistrationNumber } from '../models/vehicle-registration-number.model';
import { CustomHttpResponse } from '../models/custom-response.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesService {
  dataApi = environment.apiUrl;
  constructor(private httpService: HttpClient) { }

  createNewInsurance(data: any): Observable<Insurance> {
    const url = `${this.dataApi}/insurances`;
    return this.httpService.post<any>(url, data);
  }

  getAllInsurances(): Observable<Array<Insurance>> {
    const url = `${this.dataApi}/insurances`;
    return this.httpService.get<any>(url);
  }

  getAllVehicleNumbers(): Observable<Array<VehicleRegistrationNumber>> {
    const url = `${this.dataApi}/insurances/vehicleNumbers`;
    return this.httpService.get<any>(url);
  }

  payInsurance(data: InsurancePaymentBindModel): Observable<CustomHttpResponse> {
    const url = `${this.dataApi}/insurances/payment`;
    return this.httpService.patch<any>(url, data);

  }
}
