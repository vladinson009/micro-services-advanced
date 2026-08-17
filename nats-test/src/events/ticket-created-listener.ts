import type { Message } from 'node-nats-streaming';
import { Listener } from './base-listener.js';

class TicketCreatedListener extends Listener {
  subject = 'ticket:created';
  queueGroupName = 'payments-service';

  onMessage(data: any, msg: Message): void {
    console.log('Event data!', data);

    console.log(data.name);
    console.log(data.cost);

    // Logic..
    msg.ack();
  }
}

export { TicketCreatedListener };
