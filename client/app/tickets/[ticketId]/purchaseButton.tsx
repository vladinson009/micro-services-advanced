'use client';

import useRequest from '@/hooks/use-request';
import { useRouter } from 'next/navigation';

type PurchaseButtonProps = {
  ticketId: string;
};

type Order = {
  userId: string;
  status: string;
  expiresAt: string;
  ticket: {
    title: string;
    price: number;
    version: number;
  };
  version: number;
  id: string;
};

export default function PurchaseButton({ ticketId }: PurchaseButtonProps) {
  const router = useRouter();
  const { doRequest, errors } = useRequest<Order>({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId,
    },
    onSuccess: (order) => router.push(`/orders/${order?.id}`),
  });

  return (
    <>
      <button
        onClick={() => doRequest()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Purchase
      </button>

      {errors}
    </>
  );
}
