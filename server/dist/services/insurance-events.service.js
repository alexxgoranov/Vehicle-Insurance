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
exports.InsuranceEventsService = void 0;
const insurance_event_model_1 = __importDefault(require("../db_models/insurance-event.model"));
const insurance_model_1 = __importDefault(require("../db_models/insurance.model"));
class InsuranceEventsService {
    constructor() { }
    createInsuranceEvent(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield this.canCreateInsuranceEvent(input)) {
                    const db_result = yield insurance_event_model_1.default.create(input);
                    return {
                        dbResult: db_result,
                        message: 'success',
                        success: true,
                    };
                }
                else {
                    throw new Error('Expired insurance or unpaid fee');
                }
            }
            catch (e) {
                throw e;
            }
        });
    }
    getAllInsuranceEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db_result = yield insurance_event_model_1.default.find().lean();
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
    canCreateInsuranceEvent(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const insurance = yield insurance_model_1.default.findById(input.insurance);
            if (!insurance) {
                throw new Error(`Insurance for that event is missing!`);
            }
            const monthInterval = 12 / insurance.paymentsCount;
            const startDate = insurance.startDate.getDate();
            const startMonth = insurance.startDate.getMonth() + 1;
            const startYear = insurance.startDate.getFullYear();
            let plusMonths = 0;
            for (let payment of insurance.payments) {
                if (payment.status === 'paid') {
                    plusMonths += monthInterval;
                }
            }
            let toNewMonthNumberAvailable = (startMonth + plusMonths) % 12;
            const toNewDateAvailable = new Date(startYear, toNewMonthNumberAvailable - 1, startDate);
            const eventDate = new Date(input.eventDate);
            // console.log(eventDate);
            // console.log(insurance.startDate);
            // console.log(toNewDateAvailable);
            // console.log((eventDate >= insurance.startDate && eventDate <= new Date(startYear + 1, startMonth, startDate)) && eventDate <= toNewDateAvailable);
            if ((eventDate >= insurance.startDate && eventDate <= new Date(startYear + 1, startMonth, startDate)) && eventDate <= toNewDateAvailable) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.InsuranceEventsService = InsuranceEventsService;
//# sourceMappingURL=insurance-events.service.js.map