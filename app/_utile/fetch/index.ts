export type FetchError = {
  hasError: boolean;
  status: number;
  message: string;
};

interface IUseFetch {
  url: string;
}

interface IResponse<T> {
  data?: T;
  error?: FetchError;
}

const defaultError = {
  hasError: false,
  status: 200,
  message: 'Not Message',
};

export const fetchExtend = async <T>({ url }: IUseFetch): Promise<T> => {
  const res = await fetch(url, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  const data: T = await res.json();

  if (typeof data === 'number') {
    throw new Error(`${data}`);
  }

  return data;
};
