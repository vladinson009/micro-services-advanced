import getCurrentUser from '@/api/get-current-user';

export default async function LandingPage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-xl text-background">
        {currentUser ?
          `You are signed in ${currentUser.email}`
        : 'You are NOT signed in'}
      </h1>
    </div>
  );
}
