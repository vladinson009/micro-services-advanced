import axios, { AxiosError, AxiosResponse } from 'axios';
import { JSX, useState } from 'react';

interface UseRequestArgs<T> {
  url: string;
  method: 'get' | 'post' | 'patch';
  body?: Record<string, string>;
  onSuccess?: (data: T) => void;
}

export default function useRequest<T>({
  url,
  method,
  body,
  onSuccess,
}: UseRequestArgs<T>) {
  const [errors, setErrors] = useState<null | JSX.Element>(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response: AxiosResponse<T> = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      console.log(err);

      if (err instanceof AxiosError) {
        setErrors(
          <div className="bg-red-200">
            <h4>Ooops....</h4>
            <ul>
              {err.response?.data?.errors?.map((err: { message: string }) => (
                <li className="text-red-800" key={err.message}>
                  {err.message}
                </li>
              ))}
            </ul>
          </div>,
        );
        return;
      }
      console.error(err);
    }
  };

  return { doRequest, errors };
}
