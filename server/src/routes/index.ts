import {Router} from "express";
import insurances from "./insurances";
import insuranceEvents from "./insurance-events";


const router = Router();

router.use("/api/insurances", insurances);
router.use("/api/insurance-events", insuranceEvents);

export default router;
