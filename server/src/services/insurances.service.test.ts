import { expect, assert, should } from "chai";

import { clearDatabase, closeDatabase, connect } from "./dbHandler";
import { InsuranceService } from "./insurances.service";

let insuranceService: InsuranceService; // TO DOO!!


describe('insurances service', () => {
    before(async () => {
        await connect();
        insuranceService = new InsuranceService();
    });
    
    afterEach(async () => {
        await clearDatabase();
    });
    
    after(async () => {
        await closeDatabase();
    });

    it("should throw error if personal id is invalid", async () => {
        //arrange 
        let newInsurance = {
            duePrice: 22222,
            insurancePrice: 20,
            ownerName: "Test Testov",
            paymentsCount: 2,
            personalIdentifier: "6101057503",
            startDate: "2022-01-31T22:00:00.000Z",
            vehicleRegNumber: "СС7777МА",
            yearOfManufacture: 2003
        }
        //act
        try {
            await insuranceService.createInsurance(newInsurance);

        } catch (err: any) {
            //assert
            expect(err.message).to.be.equal('Invalid personal-identifier!');
        }
    });

    it("should throw error if vehicle registration number is invalid", async () => {
        //arrange  
        let newInsurance = {
            duePrice: 22222,
            insurancePrice: 20,
            ownerName: "Test Testov",
            paymentsCount: 2,
            personalIdentifier: "6101057509",
            startDate: "2022-01-31T22:00:00.000Z",
            vehicleRegNumber: "СС7774537МА",
            yearOfManufacture: 2003
        }

        //act
        try {
            await insuranceService.createInsurance(newInsurance);
        } catch (err: any) {
            //assert
            expect(err.message).to.be.equal('Invalid vehicle-registration number!');
        }
    });

    it("should throw error if vehicle registration number already exist", async () => {
        //arrange  
        let newInsuranceFirst = {
            duePrice: 22222,
            insurancePrice: 20,
            ownerName: "Test Testov",
            paymentsCount: 2,
            personalIdentifier: "6101057509",
            startDate: "2022-01-31T22:00:00.000Z",
            vehicleRegNumber: "СО6666МА",
            yearOfManufacture: 2003
        }
        let newInsuranceSecond = {
            duePrice: 4456,
            insurancePrice: 60,
            ownerName: "Test Testov",
            paymentsCount: 2,
            personalIdentifier: "6101057509",
            startDate: "2022-01-31T26:00:00.000Z",
            vehicleRegNumber: "СО6666МА",
            yearOfManufacture: 2007
        }
        //act
        try {
            await insuranceService.createInsurance(newInsuranceFirst);
            await insuranceService.createInsurance(newInsuranceSecond);
        } catch (err: any) {
            //assert
            expect(err.message).to.be.equal('Vehicle-registration number already exist!');
        }
    });
});
