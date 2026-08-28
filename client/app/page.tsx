import { getTickets } from '@/services/ticket-service';
import Link from 'next/link';

export default async function LandingPage() {
  const tickets = await getTickets();

  const ticketList = tickets?.map((ticket) => {
    return (
      <tr className="border-b" key={ticket.id}>
        <td className="px-4 py-2">{ticket.title}</td>
        <td className="px-4 py-2">{ticket.price}</td>
        <td>
          <Link
            className="text-blue-600 underline-offset-2 hover:text-blue-800 hover:underline"
            href={`/tickets/${ticket.id}`}
          >
            View
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2 className="text-3xl font-bold">Tickets</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left">Title</th>
            <th className="text-left">Price</th>
            <th className="text-left">Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
}
