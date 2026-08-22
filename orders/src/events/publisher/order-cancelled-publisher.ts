import { Publisher, OrderCancelledEvent, Subjects } from '@tickets-vg/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
