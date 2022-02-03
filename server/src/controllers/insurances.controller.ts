import { Request, Response } from 'express';
import { Insurance } from '../db_models/insurance.model';
import { ServiceResponse } from '../models/service-response.model';
import { VehicleRegistrationNumber } from '../models/vehicle-registration.model';
import { CustomHttpResponse } from '../models/custom-response.model';
import { InsuranceService } from '../services/insurances.service';
import app from '../app';


export class InsurancesController {

    insuranceService: InsuranceService = new InsuranceService();
    constructor() { // TO do testing with interfaces
    }

    async createInsuranceHandler(req: Request, res: Response) {
        const body = req.body;
        try {
            const newInsurance: ServiceResponse<Insurance> = await app.insuranceService.createInsurance(body);
            return res.status(200).send(newInsurance.dbResult);
        }
        catch (e) {
            const response: CustomHttpResponse = {
                success: false,
                message: e.message
            }
            return res.status(500).send(response);
        }
    }

    async getAllInsurancesHandler(req: Request, res: Response) {
        try {
            const insurances: ServiceResponse<Array<Insurance>> = await app.insuranceService.getAllInsurances();
            return res.status(200).send(insurances.dbResult);
        }
        catch (e) {
            const response: CustomHttpResponse = {
                success: false,
                message: e.message
            }
            return res.status(500).send(response);
        }
    }

    async getAllInsuredCarNumbersHandler(req: Request, res: Response) {
        try {
            const vehicleNumbers: ServiceResponse<Array<VehicleRegistrationNumber>> = await app.insuranceService.getAllVehicleRegNumbers();
            return res.status(200).send(vehicleNumbers.dbResult);
        }
        catch (e) {
            const response: CustomHttpResponse = {
                success: false,
                message: e.message
            }
            return res.status(500).send(response);
        }

    }

    async payInsuranceHandler(req: Request, res: Response) {
        const insuranceId = req.body.insuranceId;
        const paymentNumber = req.body.paymentNumber;
        try {
            const payedInsurance: ServiceResponse<null> = await app.insuranceService.payInsuranceFee({ _id: insuranceId, "payments.paymentNumber": paymentNumber },
                {
                    $set: {
                        "payments.$.status": "paid",
                        "payments.$.date": new Date()
                    }
                });
            const response: CustomHttpResponse = {
                success: payedInsurance.success,
                message: payedInsurance.message
            }
            return res.status(200).send(response);
        }
        catch (e) {
            const response: CustomHttpResponse = {
                success: false,
                message: e.message
            }
            return res.status(500).send(response);
        }
    }
}



