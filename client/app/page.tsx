import axios, { AxiosError } from 'axios';

interface CurrentUser {
  id: string;
  email: string;
  iat: number;
}

export default async function HomePage() {
  if (typeof window === 'undefined') {
    //We are on the server
    // Request should be made on ingress-nginx
  } else {
    //We are on the browser.
    // Request can be made with no base URL
  }

  try {
    const response = await axios.get<CurrentUser>(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    );
    const currentUser = response.data;
    // http://ingress-nginx.ingress-nginx-controller.svc.cluster.local/api/users/currentuser
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
    </div>
  );
}
