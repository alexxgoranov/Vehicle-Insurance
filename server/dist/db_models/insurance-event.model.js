"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const insuranceEventSchema = new mongoose_1.default.Schema({
    insurance: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Insurances" },
    vehicleRegNumber: { type: String },
    eventDate: { type: Date, required: true },
    driver: { type: String },
    eventInfo: { type: String },
    image: { type: String },
}, {
    timestamps: true,
});
const InsuranceEventModel = mongoose_1.default.model("InsuranceEvents", insuranceEventSchema);
exports.default = InsuranceEventModel;
//# sourceMappingURL=insurance-event.model.js.map