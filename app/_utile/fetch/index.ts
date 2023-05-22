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
};
