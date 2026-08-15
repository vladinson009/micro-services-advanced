'use client';

import useRequest from '@/hooks/use-request';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignoutPage() {
  const router = useRouter();
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => {
      router.push('/');
      router.refresh();
    },
  });

  useEffect(() => {
    doRequest();
  }, [doRequest]);

  return <div>Signing you out...</div>;
}
