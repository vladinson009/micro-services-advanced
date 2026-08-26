import { headers } from 'next/headers';
import buildClient from './build-client';

export default async function getClient() {
  const requestHeaders = await headers();

  return buildClient(requestHeaders);
}
