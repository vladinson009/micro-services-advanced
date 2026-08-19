import { Publisher, Subjects, TicketCreatedEvent } from '@tickets-vg/common';

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

  //
}

export { TicketCreatedPublisher };
