import { Request, Response } from 'express';
import { CustomHttpResponse } from '../models/custom-response.model';
import { InsuranceEvent } from '../db_models/insurance-event.model';
import { ServiceResponse } from '../models/service-response.model';
// import { InsuranceEventsService } from '../services/insurance-events.service';
import app from '../app';
import fs from 'fs';


export class InsuranceEventsController {
    // private insuranceEvenstService: InsuranceEventsService = new InsuranceEventsService();
    constructor() { }

    async createInsuranceEventHandler(req: any, res: Response) {

        const body = req.body;
        try {
            const payload = { ...body, image: 'http://localhost:3200/images/' + req.file.filename }
            const newInsuranceEvent: ServiceResponse<InsuranceEvent> = await app.insuranceEventsService.createInsuranceEvent(payload);
            if (newInsuranceEvent.success) {
                return res.status(200).send(newInsuranceEvent.dbResult);
            }
        }
        catch (e) {
            const response: CustomHttpResponse = {
                success: false,
                message: e.message
            }
            const filePath = `images/${req.file.filename}`;
            fs.unlinkSync(filePath);
            return res.status(422).send(response);
        }
    }

    async getAllInsuranceEventsHandler(req: Request, res: Response) {
        try {
            const allInsuranceEvents = await app.insuranceEventsService.getAllInsuranceEvents();
            return res.status(200).send(allInsuranceEvents.dbResult);
        }
        catch (e: any) {
            const response: CustomHttpResponse = {
                success: false,
                message: e.message
            }
            return res.status(500).send(response);
        }
    }
}
