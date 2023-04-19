import { Error } from '@/src/type';
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

export const useFetch = async <T>({
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
