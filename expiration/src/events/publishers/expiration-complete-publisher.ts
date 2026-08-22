import { Subjects, Publisher, ExpirationCompleteEvent } from '@tickets-vg/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
