"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInsuranceSchema = void 0;
const zod_1 = require("zod");
exports.createInsuranceSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        vehicleRegNumber: (0, zod_1.string)({ required_error: "Vehicle registration number is required" })
            .regex(/^([А-Я]{2}|[А-Я]{1})[0-9]{4}[А-Я]{2}$/),
        ownerName: (0, zod_1.string)({ required_error: "Owner name is required" })
            .regex(/^(?!.{50,})(([a-zA-Z]+\s+[a-zA-Z]+ ?)|([a-zA-Z]+\s+[a-zA-Z]+\s+[a-zA-Z]+ ?))$/),
        personalIdentifier: (0, zod_1.string)({ required_error: "Personal identifier is required" })
            .refine((data) => {
            let isOnlyDigits = /^\d+$/.test(data);
            if (data.length == 10 || isOnlyDigits) {
                let sum = 0;
                let multipliers = [2, 4, 8, 5, 10, 9, 7, 3, 6];
                for (let index = 0; index < data.length; index++) {
                    if (index < multipliers.length - 1) {
                        sum = sum + (parseInt(data[index]) * multipliers[index]);
                    }
                }
                let lastNumber = 130 - (Math.floor(sum / 11) * 11);
                if (+data[data.length - 1] == lastNumber) {
                    return true;
                }
            }
            return false;
        }, {
            message: "Incorrect personal identifier",
            path: ["personalIdentifier"],
        }),
        startDate: (0, zod_1.string)({ required_error: "Date is required" }),
        paymentsCount: (0, zod_1.number)({ required_error: "Payment count is required" }),
        yearOfManufacture: (0, zod_1.number)({ required_error: "Year of manifactorer is required" }),
        insurancePrice: (0, zod_1.number)({ required_error: "insurancePrice is required" }),
        duePrice: (0, zod_1.number)({ required_error: "insurancePrice is required" })
    })
});
//# sourceMappingURL=insurance.schema.js.map