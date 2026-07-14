import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

declare global {
    var signin: () => Promise<string[]>;
}

let mongo: undefined | MongoMemoryServer;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdfg';
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    if (mongoose.connection.db) {
        const collections = await mongoose.connection.db.collections();

        for (let collection of collections) {
            await collection.deleteMany({});
        }
    }
});

afterAll(async () => {
    await mongoose.connection.close();
    if (mongo) {
        await mongo.stop();
    }
});

/**
 And change to this:

  const cookie = response.get("Set-Cookie");

  if (!cookie) {
    throw new Error("Failed to get cookie from response");
  }
  return cookie;
 */
