
import mongoose from 'mongoose';

export interface Insurance extends mongoose.Document {
    vehicleRegNumber: string;
    ownerName: string;
    personalIdentifier: string;
    startDate: Date;
    paymentsCount: number;
    yearOfManufacture: number;
    insurancePrice: number;
    duePrice: number;
    payments: Array<{paymentNumber: number, date: Date, status: string}>
}

const insuranceSchema = new mongoose.Schema({

    vehicleRegNumber: { type: String, unique: true },
    ownerName: { type: String, required: true },
    personalIdentifier: { type: String, required: true },
    startDate: { type: Date, required: true },
    durationOfYears: { type: Number },
    paymentsCount: { type: Number, enum: [1,2,4] },
    yearOfManufacture: { type: Number },
    insurancePrize: { type: Number },
    duePrice: { type: Number },
    payments: [{
        paymentNumber: Number,
        date: Date,
        status: String
    }]
},
    {
        timestamps: true,
    });

const InsuranceModel = mongoose.model<Insurance>("Insurances", insuranceSchema);

export default InsuranceModel;