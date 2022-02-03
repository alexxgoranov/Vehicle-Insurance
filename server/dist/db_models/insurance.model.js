"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const insuranceSchema = new mongoose_1.default.Schema({
    vehicleRegNumber: { type: String, unique: true },
    ownerName: { type: String, required: true },
    personalIdentifier: { type: String, required: true },
    startDate: { type: Date, required: true },
    durationOfYears: { type: Number },
    paymentsCount: { type: Number },
    yearOfManufacture: { type: Number },
    insurancePrize: { type: Number },
    duePrice: { type: Number },
    payments: [{
            paymentNumber: Number,
            date: Date,
            status: String
        }]
}, {
    timestamps: true,
});
const InsuranceModel = mongoose_1.default.model("Insurances", insuranceSchema);
exports.default = InsuranceModel;
//# sourceMappingURL=insurance.model.js.map