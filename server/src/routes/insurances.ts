import { InsurancesController } from "../controllers/insurances.controller";
import {Router} from "express";
import validateResource from "../middlewares/validateResource";
import { createInsuranceSchema } from "../validation-schemas/insurance.schema";


const router = Router();
const insurancesController = new InsurancesController();


router.get("/", insurancesController.getAllInsurancesHandler);
router.post("/", validateResource(createInsuranceSchema), insurancesController.createInsuranceHandler);
router.get("/vehicleNumbers", insurancesController.getAllInsuredCarNumbersHandler);
router.patch('/payment', insurancesController.payInsuranceHandler);

export default router;