
import isValidPersonalIdentifier from "../utils/person-identifier.validator";
import { date, number, object, string, TypeOf } from "zod";

export const createInsuranceSchema = object({
    body: object({
        vehicleRegNumber: string({ required_error: "Vehicle registration number is required" })
            .regex(/^([А-Я]{2}|[А-Я]{1})[0-9]{4}[А-Я]{2}$/),

        ownerName: string({ required_error: "Owner name is required" })
            .regex(/^(?!.{50,})(([a-zA-Z]+\s+[a-zA-Z]+ ?)|([a-zA-Z]+\s+[a-zA-Z]+\s+[a-zA-Z]+ ?))$/),

        personalIdentifier: string({ required_error: "Personal identifier is required" })
            .refine((data) => {
                return isValidPersonalIdentifier(data)
            }, {
                message: "Incorrect personal identifier",
                path: ["personalIdentifier"],
            }),
        startDate: string({ required_error: "Date is required" }),
        paymentsCount: number({ required_error: "Payment count is required" }),
        yearOfManufacture: number({ required_error: "Year of manifactorer is required" }),
        insurancePrice: number({ required_error: "insurancePrice is required" }),
        duePrice: number({ required_error: "insurancePrice is required" })
    })

})