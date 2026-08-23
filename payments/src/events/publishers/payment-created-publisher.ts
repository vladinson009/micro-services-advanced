import { Subjects, Publisher, PaymentCreatedEvent } from '@tickets-vg/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
