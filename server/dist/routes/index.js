"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const insurances_1 = __importDefault(require("./insurances"));
const insurance_events_1 = __importDefault(require("./insurance-events"));
const router = (0, express_1.Router)();
router.use("api/insurances", insurances_1.default);
router.use("api/insurance-events", insurance_events_1.default);
//# sourceMappingURL=index.js.map