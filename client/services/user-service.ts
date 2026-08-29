import { AxiosError } from 'axios';
import getClient from './get-client';

export type CurrentUser = {
  id: string;
  email: string;
  iat: number;
} | null;

export default async function getCurrentUser() {
  try {
    const client =await  getClient()
    const { data } = await client.get<{ currentUser: CurrentUser }>(
      '/api/users/currentuser',
    );
    const currentUser = data.currentUser;

    return currentUser;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    return null;
  }
}
