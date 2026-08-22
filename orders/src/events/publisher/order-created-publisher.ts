import { Publisher, OrderCreatedEvent, Subjects } from '@tickets-vg/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    
    
}
