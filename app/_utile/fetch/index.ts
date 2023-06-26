export type FetchError = {
  hasError: boolean;
  status: number;
  message: string;
};

interface IUseFetch<> {
  method?: string;
  url: string;
  store?: boolean;
  body?: object | [];
}

export const fetchExtend = async <T>({
  method = 'GET',
  url,
  store = true,
  body,
}: IUseFetch): Promise<T> => {
  const optionInit = (store: boolean, body: object) => {
    const storeMode: RequestInit = store
      ? { cache: 'force-cache' }
      : { cache: 'no-store' };
    const bodyData: RequestInit =
      method === 'POST' ? { body: JSON.stringify(body) } : {};

    return { ...storeMode, ...bodyData };
  };

  const res = await fetch(url, { method: method, ...optionInit(store, body) });

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  const data: T = await res.json();

  if (typeof data === 'number') {
    throw new Error(`${data}`);
  }

  return data;
};
