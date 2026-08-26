// import { AxiosError } from 'axios';
import getClient from './get-client';
import { TicketDoc } from './types';

export async function getTickets() {
  const client = await getClient();
  const { data: tickets } = await client.get<TicketDoc[] | null>('/api/tickets');

  return tickets;
}

export async function getTicketById(ticketId: string) {
  const client = await getClient();
  const { data: ticket } = await client.get<TicketDoc | null>(
    `/api/tickets/${ticketId}`,
  );

  return ticket;
}
