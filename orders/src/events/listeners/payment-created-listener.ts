import type { Message } from 'node-nats-streaming';

import { Listener, Subjects, PaymentCreatedEvent } from '@tickets-vg/common';
import { queueGroupName } from './queue-group-name';
import { Order, OrderStatus } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message): Promise<void> {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('[--PaymentCreatedListener--] Order not foun');
    }

    order.set({
      status: OrderStatus.Complete,
    });

    await order.save();

    msg.ack();
  }
}
