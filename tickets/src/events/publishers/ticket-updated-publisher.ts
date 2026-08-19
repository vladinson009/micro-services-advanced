import { Publisher, Subjects, TicketUpdatedEvent } from '@tickets-vg/common';

class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

  //
}

export { TicketUpdatedPublisher };
