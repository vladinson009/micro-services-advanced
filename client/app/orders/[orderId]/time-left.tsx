'use client';

import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

import { OrderDoc } from '@/services/types';
import { useCurrentUser } from '@/context/user-context';
import { env } from '@/env/client';

export default function TimeLeft({ order }: { order: OrderDoc }) {
  const [timeLeft, setTimeLeft] = useState<null | number>(null);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    //   Recursive approach to stop the timer when reach 0
    const updateTimeLeft = () => {
      const remaining = Math.max(
        0,
        Math.ceil((new Date(order.expiresAt).getTime() - Date.now()) / 1000),
      );
      setTimeLeft(remaining);
      if (remaining > 0) {
        timeout = setTimeout(updateTimeLeft, 1000);
      }
    };

    updateTimeLeft();

    return () => clearTimeout(timeout);
  }, [order.expiresAt]);

  const message =
    timeLeft === null ? 'Calculating...'
    : timeLeft > 0 ? `Time left to pay: ${timeLeft} seconds`
    : 'Order expired!';

  return (
    <div>
      {message}
      <StripeCheckout
        stripeKey={env.NEXT_PUBLIC_STRIPE_KEY}
        token={(token) => console.log(token)}
        amount={order.ticket.price * 100}
        email={currentUser?.email}
      />
    </div>
  );
}
