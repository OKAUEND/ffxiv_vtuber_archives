export type AxiosResut<T> = {
    status: number;
    errorCode?: string;
    error?: boolean;
    payload: T;
};
