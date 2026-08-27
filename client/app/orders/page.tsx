import { getUserOrders } from '@/services/order-service';

export default async function OrderIndex() {
  const orders = await getUserOrders();

  return (
    <ul>
      {orders.map((order) => {
        return (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li>
        );
      })}
    </ul>
  );
}
