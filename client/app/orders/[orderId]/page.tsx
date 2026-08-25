type Props = {
  params: Promise<{ orderId: string }>;
};

export default async function OrderShow({ params }: Props) {
  const { orderId } = await params;

  return <div>Order</div>;
}
