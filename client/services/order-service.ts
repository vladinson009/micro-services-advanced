import getClient from './get-client';
import { OrderDoc } from './types';

export const getOrderById = async (orderId: string) => {
  const client = await getClient();
  const { data: order } = await client.get<OrderDoc>(`/api/orders/${orderId}`);

  return order;
};

export const getUserOrders = async () => {
  const client = await getClient();
  const { data: orders } = await client.get<OrderDoc[]>('/api/orders');

  return orders;
};
