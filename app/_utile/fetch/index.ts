import { cache } from 'react';
import { Error } from '@/src/types';
interface IUseFetch {
  url: string;
}

interface IResponse<T> {
  data?: T;
  error?: Error;
}

const defaultError = {
  hasError: false,
  status: 200,
  message: 'Not Message',
};

export const fetchCacheExtend = cache(
  async <T>({ url }: IUseFetch): Promise<IResponse<T>> => {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        error: {
          hasError: true,
          status: response.status,
          message: response.statusText,
        },
      };
    }
    const data: T = await response.json();

    return { data: data };
  }
);

export const fetchExtend = async <T>({
  url,
}: IUseFetch): Promise<IResponse<T>> => {
  const res = await fetch(url, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  const data: IResponse<T> = await res.json();

  if (typeof data === 'number') {
    throw new Error(`${data}`);
  }
  if (data.error) {
    throw new Error(`429 Many Request`);
  }

  return data.data;
};
