import { natsWrapper } from '../../../nats-wrapper';
import { OrderCancelledEvent } from '@tickets-vg/common';
import { OrderCanceledListener } from '../order-cancelled-listener';
import { Ticket } from '../../../models/ticket';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  const listener = new OrderCanceledListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: 'asdf',
  });
  ticket.set({ orderId });

  await ticket.save();

  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { msg, data, ticket, orderId, listener };
};

it('updates the ticket, publishes an event and acks the message', async () => {
  const { data, listener, msg, orderId, ticket } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket?.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
