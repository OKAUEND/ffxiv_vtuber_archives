import axios, { AxiosAdapter, AxiosError, AxiosResponse } from 'axios';
import { AxiosResut } from '../../types/api/index';

export const AxiosInstance = <T>() => {
    const axiosInstance = axios.create({
        baseURL: '',
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 2000,
    });

    const onSuccessful = (response: AxiosResponse<T[]>): AxiosResut<T[]> => {
        const result: AxiosResut<T[]> = {
            status: response.status,
            payload: response.data,
        };
        return result;
    };

    const onRejected = (error: AxiosError) => {
        if (error.response?.data === 'ECONNABORTED') {
            const result: AxiosResut<T[]> = {
                status: 408,
                error: true,
                errorCode: error.code,
                payload: [],
            };
            return result;
        }
        return Promise.reject('error');
    };

    axiosInstance.interceptors.response.use(onSuccessful, onRejected);

    const fetchPost = async (url: string) => {
        const response = await axiosInstance.post<string, AxiosResut<T[]>>(url);
        return response;
    };

    return fetchPost;
};
