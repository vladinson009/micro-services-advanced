import { loadStripe } from '@stripe/stripe-js';
import { env } from '@/env/client';

export const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);
