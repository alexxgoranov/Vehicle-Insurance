import { expect, assert, should } from "chai";
import { Insurance } from "../db_models/insurance.model";
import { ServiceResponse } from "../models/service-response.model";
import { clearDatabase, closeDatabase, connect } from "./dbHandler";
import { InsuranceEventsService } from "./insurance-events.service";
import { InsuranceService } from "./insurances.service";

let insuranceService: InsuranceService;
let insuranceEventsService: InsuranceEventsService;


describe('insurance event service', () => {
    before(async () => {
        await connect();
        insuranceService = new InsuranceService();
        insuranceEventsService = new InsuranceEventsService();
    });

    afterEach(async () => {
        await clearDatabase();
    });

    after(async () => {
        await closeDatabase();
    });


    it("should throw error if insurance doesn't exist", async () => {
        //arrange  
        let newInsurance = {
            duePrice: 22222,
            insurancePrice: 20,
            ownerName: "Test Testov",
            paymentsCount: 2,
            personalIdentifier: "6101057509",
            startDate: "2022-01-31T22:00:00.000Z",
            vehicleRegNumber: "СС7777МА",
            yearOfManufacture: 2003
        };
        let newInsuranceEvent = {
            insurance: "61f7b82e6807349b666c6bc8",
            vehicleRegNumber: "СС7777МА",
            eventDate: new Date().toString(),
            driver: "Test",
            eventInfo: "Unexpected accident",
            image: "http://localhost:3200/images/test.jpg"
        };

        // act and assert
        await expect(insuranceService.createInsurance(newInsurance)).to.be.fulfilled;
        await expect(insuranceEventsService.createInsuranceEvent(newInsuranceEvent)).to.be.rejectedWith('Insurance for that event is missing!');
    });

    it("should throw error if insurance is expired or month fee is unpaid", async () => {
        //arrange  
        let newInsurance = {
            duePrice: 22222,
            insurancePrice: 20,
            ownerName: "Test Testov",
            paymentsCount: 2,
            personalIdentifier: "6101057509",
            startDate: new Date().toISOString(),
            vehicleRegNumber: "СО4342ВА",
            yearOfManufacture: 2003
        };
        const insurance: ServiceResponse<Insurance> = await expect(insuranceService.createInsurance(newInsurance)).to.be.fulfilled;
        const currentDate = new Date();
        let insuranceEvent = {
            insurance: insurance.dbResult._id,
            vehicleRegNumber: "СО4342ВА",
            eventDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3).toISOString(),
            driver: "Test",
            eventInfo: "test",
            image: "http://localhost:3200/images/test.jpg"
        };
        // act and assert
        await expect(insuranceEventsService.createInsuranceEvent(insuranceEvent)).to.be.rejectedWith('Expired insurance or unpaid fee!');
    }
    );
    it("should create a new insurance event", async () => {
        //arrange  
        let newInsurance = {
            duePrice: 22222,
            insurancePrice: 20,
            ownerName: "Test Testov",
            paymentsCount: 2,
            personalIdentifier: "6101057509",
            startDate: new Date().toISOString(),
            vehicleRegNumber: "СО4342ВА",
            yearOfManufacture: 2003
        };
        const serviceResponse: ServiceResponse<Insurance> = await expect(insuranceService.createInsurance(newInsurance)).to.be.fulfilled;
        await expect(insuranceService.payInsuranceFee({ _id: serviceResponse.dbResult._id, "payments.paymentNumber": 1 },
            {
                $set: {
                    "payments.$.status": "paid",
                    "payments.$.date": new Date()
                }
            })).to.be.fulfilled;


        let insuranceEvent = {
            insurance: serviceResponse.dbResult._id,
            vehicleRegNumber: "СО4342ВА",
            eventDate: new Date().toISOString(),
            driver: "Test",
            eventInfo: "test",
            image: "http://localhost:3200/images/test.jpg"
        };
        // act and assert
        await expect(insuranceEventsService.createInsuranceEvent(insuranceEvent)).to.be.fulfilled;
    }
    );
});
