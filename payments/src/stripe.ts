import Stripe from 'stripe';

const STRIPE_KEY = process.env.STRIPE_KEY as string;

export const stripe: Stripe = new Stripe(STRIPE_KEY, {
  apiVersion: '2026-07-29.dahlia',
});
