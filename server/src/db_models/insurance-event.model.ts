import mongoose from 'mongoose';
import { Insurance } from './insurance.model';

export interface InsuranceEvent extends mongoose.Document {
    insurance: Insurance["_id"];
    vehicleRegNumber: string;
    eventDate: Date;
    driver: string;
    eventInfo: string
    image: string;
}

const insuranceEventSchema = new mongoose.Schema({
    insurance: { type: mongoose.Schema.Types.ObjectId, ref: "Insurances" },
    vehicleRegNumber: { type: String},
    eventDate: { type: Date, required: true },
    driver: { type: String },
    eventInfo: { type: String },
    image: { type: String },
},
    {
        timestamps: true,
    });

const InsuranceEventModel = mongoose.model<InsuranceEvent>("InsuranceEvents", insuranceEventSchema);

export default InsuranceEventModel;