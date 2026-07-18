import axios, { AxiosError } from 'axios';
import { headers } from 'next/headers';

interface CurrentUser {
  id: string;
  email: string;
  iat: number;
}

export default async function HomePage() {
  const headersList = await headers();
  let currentUser: CurrentUser | undefined;
  let baseUrl = '';
  if (typeof window === 'undefined') {
    baseUrl = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';
    //We are on the server
    // Request should be made on ingress-nginx
  }

  try {
    const { data } = await axios.get<{ currentUser: CurrentUser }>(
      baseUrl + '/api/users/currentuser',
      {
        headers: Object.fromEntries(headersList),
      },
    );

    currentUser = data.currentUser;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    } else {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-8xl">Landing Page</h1>
      <p>{currentUser?.email}</p>
    </div>
  );
}
