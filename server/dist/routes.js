"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateResource_1 = __importDefault(require("./middlewares/validateResource"));
const storage_1 = __importDefault(require("./utils/storage"));
const insurance_schema_1 = require("./validation-schemas/insurance.schema");
const insurances_controller_1 = require("./controllers/insurances.controller");
const insurance_events_controller_1 = require("./controllers/insurance-events.controller");
const insurancesController = new insurances_controller_1.InsurancesController();
const insuranceEvenstController = new insurance_events_controller_1.InsuranceEventsController();
function routes(app) {
    // console.log(new InsuranceService());
    // const insurancesController = new InsurancesController();
    // const insuranceEvenstController = new InsuranceEventsController();
    app.post('/api/insurances', (0, validateResource_1.default)(insurance_schema_1.createInsuranceSchema), (req, res) => insurancesController.createInsuranceHandler(req, res));
    app.get('/api/insurances', insurancesController.getAllInsurancesHandler);
    app.get('/api/insurances/vehicleNumbers', insurancesController.getAllInsuredCarNumbersHandler);
    app.patch('/api/insurances/payment', insurancesController.payInsuranceHandler);
    app.post('/api/insurance-events', storage_1.default, insuranceEvenstController.createInsuranceEventHandler);
    app.get('/api/insurance-events', insuranceEvenstController.getAllInsuranceEventsHandler);
}
exports.default = routes;
//# sourceMappingURL=routes.js.map