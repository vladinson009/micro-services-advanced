import { getOrderById } from '@/services/order-service';
import TimeLeft from './time-left';

type Props = {
  params: Promise<{ orderId: string }>;
};

export default async function OrderShow({ params }: Props) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);

  return <TimeLeft order={order} />;
}
