'use client';
import useRequest from '@/hooks/use-request';
import { useRouter } from 'next/navigation';
import { SubmitEvent, useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => router.push('/'),
  });

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 m-4">
      <h1 className="text-5xl">Sign Up</h1>
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          id="email"
          className="border border-gray-400"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          className="border border-gray-400"
        />
      </div>
      {errors}
      <button className="cursor-pointer w-fit bg-blue-600 text-background rounded-xs px-4 py-1">
        Sign Up
      </button>
      <div>{email}</div>
    </form>
  );
}
