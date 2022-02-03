import { FilterQuery, UpdateQuery } from "mongoose";
import { ServiceResponse } from "../models/service-response.model";
import InsuranceModel, { Insurance } from "../db_models/insurance.model";
import { VehicleRegistrationNumber } from "../models/vehicle-registration.model";
import { InsuranceInputData } from "../bind-models/insurance.bind.model";
import isValidPersonalIdentifier from "../utils/person-identifier.validator";
import isValidVehicleRegistrationNumber from "../utils/vehicle-registration-number.validator";



export class InsuranceService {
    constructor() { }

    async createInsurance(inputData: InsuranceInputData): Promise<ServiceResponse<Insurance>> {
        try {
            if (!isValidPersonalIdentifier(inputData.personalIdentifier)) {
                throw new Error('Invalid personal-identifier!');
            }

            if (!isValidVehicleRegistrationNumber(inputData.vehicleRegNumber)) {
                throw new Error('Invalid vehicle-registration number!');
            }

            const insuranceInDb = await InsuranceModel.findOne({ vehicleRegNumber: inputData.vehicleRegNumber });
            if (!!insuranceInDb) {
                throw new Error('Vehicle-registration number already exist!');
            }

            let paymentsInfo: Array<{ paymentNumber: number, date: Date, status: string }> = [];
            for (let count = 1; count <= inputData.paymentsCount; count++) {
                paymentsInfo.push({ paymentNumber: count, date: null, status: 'unpaid' })
            }

            const db_result: Insurance = await InsuranceModel.create({ ...inputData, durationOfYears: 1, payments: paymentsInfo })
            return {
                dbResult: db_result,
                message: 'success',
                success: true,
            }
        }
        catch (e) {
            throw e;
        }

    }

    async getAllInsurances(): Promise<ServiceResponse<Array<Insurance>>> {

        try {
            const db_result: Array<Insurance> = await InsuranceModel.find().lean();
            return {
                dbResult: db_result,
                message: 'success',
                success: true,
            }
        }
        catch (e) {
            throw e;
        }
    }

    async getAllVehicleRegNumbers(): Promise<ServiceResponse<Array<VehicleRegistrationNumber>>> {
        try {
            const db_result: Array<VehicleRegistrationNumber> = await InsuranceModel.find({}, { vehicleRegNumber: 1, ownerName: 1, _id: 1 }).lean();
            return {
                dbResult: db_result,
                message: 'success',
                success: true,
            }
        }
        catch (e) {
            throw (e);
        }
    }

    async payInsuranceFee(
        query: FilterQuery<any>,
        update: UpdateQuery<any>): Promise<ServiceResponse<null>> {

        try {
            const db_result = await InsuranceModel.updateOne(query, update);
            if (db_result.modifiedCount === 0) {
                throw new Error('Failed payment operation!');
            }

            return {
                dbResult: null,
                message: 'Successfully paid fee!',
                success: true,
            }
        }
        catch (e) {
            throw e;
        }

    }
}


