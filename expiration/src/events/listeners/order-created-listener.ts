import type { Message } from 'node-nats-streaming';

import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from '@tickets-vg/common';

import { expirationQueue } from '../../queues/expiration-queue';

import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent['data'], msg: Message): Promise<void> {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting this many milliiseconds to process the job', delay);

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      },
    );

    msg.ack();
  }
}
