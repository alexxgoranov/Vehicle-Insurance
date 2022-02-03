"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsurancesController = void 0;
const insurances_service_1 = require("../services/insurances.service");
const app_1 = __importDefault(require("../app"));
class InsurancesController {
    constructor() {
        this.insuranceService = new insurances_service_1.InsuranceService();
    }
    createInsuranceHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const newInsurance = yield app_1.default.insuranceService.createInsurance(body);
                return res.status(200).send(newInsurance.dbResult);
            }
            catch (e) {
                return res.status(500).send(e.message);
            }
        });
    }
    getAllInsurancesHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const insurances = yield app_1.default.insuranceService.getAllInsurances();
            return res.status(200).send(insurances.dbResult);
        });
    }
    getAllInsuredCarNumbersHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicleNumbers = yield app_1.default.insuranceService.getAllVehicleRegNumbers();
            return res.status(200).send(vehicleNumbers.dbResult);
        });
    }
    payInsuranceHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const insuranceId = req.body.insuranceId;
            const paymentNumber = req.body.paymentNumber;
            const payedInsurance = yield app_1.default.insuranceService.payInsuranceFee({ _id: insuranceId, "payments.paymentNumber": paymentNumber }, {
                $set: {
                    "payments.$.status": "paid",
                    "payments.$.date": new Date()
                }
            });
            let response;
            if (payedInsurance.success) {
                response = {
                    success: true,
                    message: 'Successfully paid fee!'
                };
                return res.status(200).send(response);
            }
            else {
                response = {
                    success: false,
                    message: 'Payment failure!'
                };
                return res.status(200).send(response);
            }
        });
    }
}
exports.InsurancesController = InsurancesController;
//# sourceMappingURL=insurances.controller.js.map