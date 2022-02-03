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
exports.clearDatabase = exports.closeDatabase = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongod;
/**
 * Connect to the in-memory database.
 */
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("--------- CONNECT TO DATABASE ----------------");
        mongod = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongod.getUri();
        // const mongooseOpts = {
        //     useNewUrlParser: true,
        //     autoReconnect: true,
        //     reconnectTries: Number.MAX_VALUE,
        //     reconnectInterval: 1000
        // };
        // await mongoose.connection.close();
        yield mongoose_1.default.connect(uri);
    });
}
exports.connect = connect;
;
/**
 * Drop database, close the connection and stop mongod.
 */
function closeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (mongod) {
            console.log("--------- CLOSE DATABASE ----------------");
            yield mongoose_1.default.connection.dropDatabase();
            yield mongoose_1.default.connection.close();
            yield mongod.stop();
        }
    });
}
exports.closeDatabase = closeDatabase;
;
/**
 * Remove all the data for all db collections.
 */
// process.env.NODE_ENV.includes('test');
function clearDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (mongod) {
            const collections = mongoose_1.default.connection.collections;
            for (const key in collections) {
                const collection = collections[key];
                yield collection.deleteMany({});
            }
        }
    });
}
exports.clearDatabase = clearDatabase;
;
//# sourceMappingURL=dbHandler.js.map