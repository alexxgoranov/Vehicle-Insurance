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
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
// import config = ('config');
const db_connect_1 = require("./utils/db_connect");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const insurances_service_1 = require("./services/insurances.service");
const insurance_events_service_1 = require("./services/insurance-events.service");
// import routes from 'routes/index'; TO DO!!!
// export function createServer(){
const app = (0, express_1.default)();
const port = 3200;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.insuranceService = new insurances_service_1.InsuranceService();
app.insuranceEventsService = new insurance_events_service_1.InsuranceEventsService();
// parse application/json
// app.use(bodyParser.json())
app.use((0, cors_1.default)());
app.use('/images', express_1.default.static(path_1.default.join('images')));
// app.use(routes); TO DO !!!
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`App is running at http://localhost:${port}`);
    if (process.env.NODE_ENV.includes('development') // true
    ) {
        yield (0, db_connect_1.connect)();
    }
    (0, routes_1.default)(app);
}));
// return app;
// }
exports.default = app;
//# sourceMappingURL=app.js.map