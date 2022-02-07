import { InsuranceEventsController } from "../controllers/insurance-events.controller";
import e, { NextFunction, Router } from "express";
import storage from "../utils/storage";
import express, { Request, Response } from 'express';
import multer from "multer";
import { CustomHttpResponse } from "../models/custom-response.model";
import { InsuranceEventsService } from "../services/insurance-events.service";

const router = Router();
const insuranceEvenstController = new InsuranceEventsController(new InsuranceEventsService());

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    storage(req, res, (err: any) => {
        if (!!err) {
            const response: CustomHttpResponse = {
                success: false,
                message: err.message
            }
            return res.status(500).send(response);
        } else {
            return next();
        }
    })
}, insuranceEvenstController.createInsuranceEventHandler.bind(insuranceEvenstController));
router.get("/", insuranceEvenstController.getAllInsuranceEventsHandler.bind(insuranceEvenstController));


export default router;