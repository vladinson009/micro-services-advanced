import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketUpdatedEvent } from '@tickets-vg/common';

import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    // const ticket = await Ticket.findByEvent(data);

    // if (!ticket) {
    //   throw new Error('Ticket not found');
    // }
    // const { title, price } = data;
    // ticket.set({
    //   title,
    //   price,
    // });

    // await ticket.save();

    // msg.ack();
    //! With the code above - the version does not increment,
    //! because there is no change of title or price in some case
    const updatedTicket = await Ticket.findOneAndUpdate(
      {
        _id: data.id,
        version: data.version - 1,
      },
      {
        $set: {
          title: data.title,
          price: data.price,
          version: data.version,
        },
      },
      { new: true },
    );

    if (!updatedTicket) {
      throw new Error('Ticket not found or wrong version');
    }

    msg.ack();
  }
}
