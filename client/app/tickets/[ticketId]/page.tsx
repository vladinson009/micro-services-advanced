import { getTicketById } from '@/services/ticket-service';
import PurchaseButton from './purchaseButton';

type PageProps = {
  params: Promise<{ ticketId: string }>;
};
export default async function TicketShow({ params }: PageProps) {
  const param = await params;
  const ticket = await getTicketById(param.ticketId);
  if (!ticket) return;

  return (
    <div>
      <h1 className="text-4xl">{ticket?.title}</h1>
      <h4 className="text-2xl">Price: ${ticket?.price}</h4>
      <PurchaseButton ticketId={ticket.id} />
    </div>
  );
}
