import { AxiosError } from 'axios';
import getClient from './get-client';

export type TicketDoc = {
  id: string;
  price: number;
  title: string;
  userId: string;
  version: number;
  orderId?: string;
};

export async function getTickets() {
  try {
    const client = await getClient();
    const { data: tickets } = await client.get<TicketDoc[] | null>('/api/tickets');

    return tickets;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    } else {
      console.log(error);
    }
    return null;
  }
}
export async function getTicket(ticketId: string) {
  try {
    const client = await getClient();
    const { data: ticket } = await client.get<TicketDoc | null>(
      `/api/tickets/${ticketId}`,
    );

    return ticket;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    } else {
      console.log(error);
    }
    return null;
  }
}
