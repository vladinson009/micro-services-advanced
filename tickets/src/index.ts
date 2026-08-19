import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('No JWT_KEY env');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('No MONGO_URI env');
  }
  try {
    await natsWrapper.connect('ticketing', 'laskjf', 'http://nats-srv:4222');
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');
    app.listen(3000, () => {
      console.log('Listening on port 3000!!!!!');
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
