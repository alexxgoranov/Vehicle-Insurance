import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

/**
 * Connect to the in-memory database.
 */
export async function connect() {
    console.log("--------- CONNECT TO DATABASE ----------------");

    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
};

/**
 * Drop database, close the connection and stop mongod.
 */
export async function closeDatabase() {
    if (mongod ) {
        console.log("--------- CLOSE DATABASE ----------------")
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoose.disconnect();
        await mongod.stop();
    }
};

/**
 * Remove all the data for all db collections.
 */

 // process.env.NODE_ENV.includes('test');

export async function clearDatabase() {
    if (mongod) {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    }
};