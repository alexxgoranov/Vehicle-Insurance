import { expect, assert, should, use } from "chai";
import chai_promised from "chai-as-promised";
import { clearDatabase, closeDatabase, connect } from "./dbHandler";
import { InsuranceService } from "./insurances.service";

let insuranceService: InsuranceService; // TO DOO!!

use(chai_promised);


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
        // act and assert
        await expect(insuranceService.createInsurance(newInsurance)).to.be.rejectedWith('Invalid personal-identifier!');
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
        // act and assert
        await expect(insuranceService.createInsurance(newInsurance)).to.be.rejectedWith('Invalid vehicle-registration number!');
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

        // act and assert
        await expect(insuranceService.createInsurance(newInsuranceFirst)).to.be.fulfilled;
        await expect(insuranceService.createInsurance(newInsuranceSecond)).to.be.rejectedWith('Vehicle-registration number already exist!');
    });

    it("should create new insurance", async () => {
        let newInsurance = {
            duePrice: 3464,
            insurancePrice: 20,
            ownerName: "Test Testov",
            paymentsCount: 4,
            personalIdentifier: "6101057509",
            startDate: "2022-01-31T22:00:00.000Z",
            vehicleRegNumber: "СС7772МА",
            yearOfManufacture: 2003
        }
        // act and assert
        await expect(insuranceService.createInsurance(newInsurance)).to.be.fulfilled;
    });
});
