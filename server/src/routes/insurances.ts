import { InsurancesController } from "../controllers/insurances.controller";
import { Router } from "express";
import validateResource from "../middlewares/validateResource";
import { createInsuranceSchema } from "../validation-schemas/insurance.schema";
import { InsuranceService } from "../services/insurances.service";


const router = Router();
const insurancesController = new InsurancesController(new InsuranceService());


router.get("/", insurancesController.getAllInsurancesHandler.bind(insurancesController));
router.post("/", validateResource(createInsuranceSchema), insurancesController.createInsuranceHandler.bind(insurancesController));
router.get("/vehicleNumbers", insurancesController.getAllInsuredCarNumbersHandler.bind(insurancesController));
router.patch('/payment', insurancesController.payInsuranceHandler.bind(insurancesController));

export default router;