import axios, { AxiosError } from 'axios';
import { JSX, useState } from 'react';

interface UseRequestArgs {
  url: string;
  method: 'get' | 'post' | 'patch';
  body?: Record<string, string>;
  onSuccess?: () => void;
}

export default function useRequest({
  url,
  method,
  body,
  onSuccess,
}: UseRequestArgs) {
  const [errors, setErrors] = useState<null | JSX.Element>(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const respone = await axios[method](url, body);

      if (onSuccess) {
        onSuccess();
      }

      return respone.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrors(
          <div className="bg-red-200">
            <h4>Ooops....</h4>
            <ul>
              {err.response?.data.errors.map((err: { message: string }) => (
                <li className="text-red-800" key={err.message}>
                  {err.message}
                </li>
              ))}
            </ul>
          </div>,
        );
      }
    }
  };

  return { doRequest, errors };
}
