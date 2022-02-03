import { ServiceResponse } from "../models/service-response.model";
import InsuranceEventModel, { InsuranceEvent } from "../db_models/insurance-event.model";
import InsuranceModel from "../db_models/insurance.model";
import { InsuranceEventInputData } from "../bind-models/insurance-event.bind.model";


export class InsuranceEventsService {

    constructor() { }

    async createInsuranceEvent(input: InsuranceEventInputData): Promise<ServiceResponse<InsuranceEvent>> {
        try {
            if (await this.canCreateInsuranceEvent(input)) {
                const db_result = await InsuranceEventModel.create(input)
                return {
                    dbResult: db_result,
                    message: 'success',
                    success: true,
                }
            } else {
                throw new Error('Expired insurance or unpaid fee');
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getAllInsuranceEvents(): Promise<ServiceResponse<Array<InsuranceEvent>>> {
        try {
            const db_result: Array<InsuranceEvent> = await InsuranceEventModel.find().lean();
            return {
                dbResult: db_result,
                message: 'success',
                success: true,
            }
        }
        catch (e) {
            throw (e);
        }
    }
    private async canCreateInsuranceEvent(input: InsuranceEventInputData) {
        const insurance: any = await InsuranceModel.findById(input.insurance);
        if (!insurance) {

            throw new Error(`Insurance for that event is missing!`);

        }
        const monthInterval = 12 / insurance.paymentsCount;
        const startDate = insurance.startDate.getDate();
        const startMonth = insurance.startDate.getMonth();
        const startYear = insurance.startDate.getFullYear();
        let plusMonths = 0;
        let toNewDateAvailable: Date;
        for (let payment of insurance.payments) {
            if (payment.status === 'paid') {
                plusMonths += monthInterval;
            }
        }
        if (plusMonths === 12) {
            toNewDateAvailable = new Date(startYear + 1, startMonth, startDate);
        } else {
            toNewDateAvailable = new Date(startYear, (startMonth + plusMonths), startDate);
        }
        const eventDate = new Date(input.eventDate)
        // console.log(input);
        // console.log(eventDate);
        // console.log(insurance.startDate);
        // console.log(toNewDateAvailable);
        // console.log(eventDate >= insurance.startDate && eventDate <= toNewDateAvailable);
        if (eventDate >= insurance.startDate && eventDate <= toNewDateAvailable) {
            return true;
        } else {
            return false;
        }
    }


}

