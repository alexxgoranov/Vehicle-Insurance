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
exports.InsuranceService = void 0;
const insurance_model_1 = __importDefault(require("../db_models/insurance.model"));
class InsuranceService {
    constructor() { }
    createInsurance(inputData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let paymentsInfo = [];
                for (let count = 1; count <= inputData.paymentsCount; count++) {
                    paymentsInfo.push({ paymentNumber: count, date: null, status: 'unpaid' });
                }
                const db_result = yield insurance_model_1.default.create(Object.assign(Object.assign({}, inputData), { durationOfYears: 1, payments: paymentsInfo }));
                return {
                    dbResult: db_result,
                    message: 'success',
                    success: true,
                };
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    getAllInsurances() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db_result = yield insurance_model_1.default.find().lean();
                return {
                    dbResult: db_result,
                    message: 'success',
                    success: true,
                };
            }
            catch (e) {
                throw (e);
            }
        });
    }
    getAllVehicleRegNumbers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db_result = yield insurance_model_1.default.find({}, { vehicleRegNumber: 1, ownerName: 1, _id: 1 }).lean();
                return {
                    dbResult: db_result,
                    message: 'success',
                    success: true,
                };
            }
            catch (e) {
                throw (e);
            }
        });
    }
    payInsuranceFee(query, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db_result = yield insurance_model_1.default.updateOne(query, update);
                return {
                    dbResult: null,
                    message: 'success',
                    success: db_result.modifiedCount === 1,
                };
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
}
exports.InsuranceService = InsuranceService;
//# sourceMappingURL=insurances.service.js.map