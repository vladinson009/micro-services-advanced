import type { TicketCreatedEvent } from './ticket-created-event.js';

import { Publisher } from './base-publisher.js';
import { Subjects } from './subjects.js';

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

export { TicketCreatedPublisher };
