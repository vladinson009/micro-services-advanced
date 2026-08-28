import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';

const start = async () => {
  console.log('Starting...');

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('No NATS_CLIENT_ID env');
  }
  if (!process.env.NATS_URL) {
    throw new Error('No NATS_URL env');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('No NATS_CLUSTER_ID env');
  }
  if (!process.env.REDIS_HOST) {
    throw new Error('No REDIS_HOST env');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL,
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    // NATS Listeners

    new OrderCreatedListener(natsWrapper.client).listen();
  } catch (error) {
    console.error(error);
    console.log('[index.ts] expiration');
  }
};
start();
