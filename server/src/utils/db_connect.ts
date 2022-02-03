import mongoose from 'mongoose';
import config from 'config';
// import log from './logger'

export async function connect() {
    const dbUri = config.get<string>('dbUri');
    console.log(dbUri);
    try {
        await mongoose.connect(dbUri);
        // log.info("DB connected");
    }
    catch (error) {
        console.log("Could not connect to DB");
        process.exit(1);
    }

}

// connect;