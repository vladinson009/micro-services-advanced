import { headers } from 'next/headers';
import buildClient from './build-client';
import { AxiosError } from 'axios';

export type CurrentUser = {
  id: string;
  email: string;
  iat: number;
} | null;

export default async function getCurrentUser() {
  try {
    const reqHeaders = await headers();
    const client = buildClient(reqHeaders);
    const { data } = await client.get<{ currentUser: CurrentUser }>(
      '/api/users/currentuser',
    );
    const currentUser = data.currentUser;

    return currentUser;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    } else {
      console.log(error);
    }
    return null;
  }
}
