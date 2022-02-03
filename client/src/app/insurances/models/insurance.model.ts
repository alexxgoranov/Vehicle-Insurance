
export class Insurance {
    _id: string;
    vehicleRegNumber: string;
    ownerName: string;
    personalIdentifier: string;
    startDate: Date;
    paymentsCount: number;
    yearOfManufacture: number;
    insurancePrice: number;
    duePrice: number;
    payments: Array<InsurancePayment>
}


export class InsurancePayment {
    paymentNumber: number;
    date: Date;
    status: string; 
}