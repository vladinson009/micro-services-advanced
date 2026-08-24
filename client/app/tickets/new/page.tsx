'use client';
import { SubmitEvent, useState } from 'react';
import useRequest from '@/hooks/use-request';
import { useRouter } from 'next/navigation';

export default function NewTicket() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: () => router.push('/'),
  });

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) return;

    setPrice(value.toFixed(2));
  };

  return (
    <div className="">
      <h1 className="text-3xl">Create a Ticket</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full" action="">
        <div className=" flex gap-2 w-full">
          <label htmlFor="">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border flex-1"
            type="text"
          />
        </div>
        <div className=" flex gap-2 w-full">
          <label htmlFor="">Price</label>
          <input
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            className="border flex-1"
            type="text"
          />
        </div>
        {errors}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
