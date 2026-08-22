import type { Message } from 'node-nats-streaming';

import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from '@tickets-vg/common';
import { queueGroupName } from './queue-group-name';

import { Ticket } from '../../models/ticket';

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message): Promise<void> {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // If no ticket - throw error
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // Mark the ticket as being reserved by setting its orderIId property
    ticket.set({ orderId: data.id });

    // Save the ticket
    await ticket.save();

    // Ack the message
    msg.ack();
  }
}

export { OrderCreatedListener };
