"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const chai_1 = require("chai");
const dbHandler_1 = require("./dbHandler");
before(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbHandler_1.connect)();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbHandler_1.clearDatabase)();
}));
after(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbHandler_1.closeDatabase)();
}));
describe('insurance event service', () => {
    it("should throw error if insurance doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
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
        // act
        try {
            yield app_1.default.insuranceService.createInsurance(newInsurance);
            yield app_1.default.insuranceEventsService.createInsuranceEvent(newInsuranceEvent);
        }
        catch (err) {
            //assert
            (0, chai_1.expect)(err.message).to.be.equal('Insurance for that event is missing!');
        }
    }));
    it("should throw error if insurance is expired or month fee is unpaid", () => __awaiter(void 0, void 0, void 0, function* () {
        //arrange  
        let newInsurance = {
            duePrice: 22222,
            insurancePrice: 20,
            ownerName: "Test Testov",
            paymentsCount: 2,
            personalIdentifier: "6101057509",
            startDate: new Date().toISOString(),
            vehicleRegNumber: "СС7777МА",
            yearOfManufacture: 2003
        };
        const insurance = yield app_1.default.insuranceService.createInsurance(newInsurance);
        const currentDate = new Date();
        let insuranceEvent = {
            insurance: insurance.dbResult._id,
            vehicleRegNumber: "СС7777МА",
            eventDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3).toISOString(),
            driver: "Test",
            eventInfo: "test",
            image: "http://localhost:3200/images/test.jpg"
        };
        //act
        try {
            yield app_1.default.insuranceEventsService.createInsuranceEvent(insuranceEvent);
        }
        catch (err) {
            //assert
            (0, chai_1.expect)(err.message).to.be.equal('Expired insurance or unpaid fee');
        }
    }));
    // it("should throw error if plate number is existing", async () => {
    //     //arrange  
    //     let owner = await User.create({ firstName: "Pesho", lastName: "Pesho", identityNumber: 9405109356 })
    //     let car = { owner: owner.id, plateNumber: 'CB1234AA', productionDate: new Date() } as unknown as ICar;
    //     await Car.create(car);
    //     let session = await Car.startSession();
    //     //act
    //     try {
    //         await serviceContainer.carService.createCar(car, session);
    //     } catch (err: any) {
    //         //assert
    //         expect(err.message).to.be.equal(`Car with plate number: ${car.plateNumber} already exits!`);
    //     }
    // });
});
//# sourceMappingURL=insurance-events.service.test.js.map