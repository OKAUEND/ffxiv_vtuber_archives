type Error = {
    hasError: boolean;
    status: number;
    message: string;
};

interface IUseFetch {
    url: string;
}

interface IResponse<T> {
    data: T | {};
    error: Error;
}

const defaultError = {
    hasError: false,
    status: 200,
    message: 'Not Message',
};

export const useFetch = async <T>({
    url,
}: IUseFetch): Promise<IResponse<T>> => {
    const response = await fetch(url).then(async (res) => {
        if (!res.ok) {
            return {
                data: {},
                error: {
                    status: res.status,
                    message: '',
                    hasError: true,
                },
            };
        }
        const data = (await res.json()) as T;

        return { data: data, error: defaultError };
    });

    return response;
};
