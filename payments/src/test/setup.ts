process.env.JWT_KEY = 'test-secret';

import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';
declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

let mongo: undefined | MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfg';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
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

global.signin = (id) => {
  // const email = 'test@test.com';
  // const password = 'password';
  // const response = await request(app)
  //     .post('/api/users/signup')
  //     .send({ email, password })
  //     .expect(201);

  // const cookie = response.get('Set-Cookie');

  // if (!cookie) {
  //     throw new Error('Failed to get cookie from response');
  // }
  // return cookie;

  //! Build a JWT payload. { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64.
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
