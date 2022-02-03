import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InsuranceEvent } from '../models/insurance-event.model';


@Injectable({
  providedIn: 'root'
})
export class InsuranceEventsService {
  dataApi = environment.apiUrl;
  constructor(private httpService: HttpClient) { }


  createNewEvent(data: any, image: File): Observable<InsuranceEvent> {
    const url = `${this.dataApi}/insurance-events`;
    const formData = new FormData()
    formData.append('insurance', data.insurance);
    formData.append('vehicleRegNumber', data.vehicleRegNumber);
    formData.append('eventDate', data.eventDate);
    formData.append('driver', data.driver);
    formData.append('eventInfo', data.eventInfo);
    formData.append('image', image);
    return this.httpService.post<InsuranceEvent>(url, formData);
  }

  gellAllInsuranceEvents(): Observable<Array<InsuranceEvent>> {
    const url = `${this.dataApi}/insurance-events`;
    return this.httpService.get<Array<InsuranceEvent>>(url);
  }

}
