import axios, { AxiosAdapter, AxiosError, AxiosResponse } from 'axios';
import { AxiosResut } from '../../types/api/index';

export const AxiosInstance = (contentType: contentType) => {
    const instance = axios.create({
        baseURL: '',
        headers: {
            Accept: 'application/json',
            'Content-Type': contentType,
        },
        timeout: 2000,
    });

    const onSuccessful = <T>(response: AxiosResponse<T[]>): AxiosResut<T[]> => {
        const result: AxiosResut<T[]> = {
            status: response.status,
            payload: response.data,
        };

        return result;
    };

    const onRejected = <T>(error: AxiosError) => {
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

    instance.interceptors.response.use(onSuccessful, onRejected);

    const fetchPost = async <T>(url: string) => {
        const response = await instance.post<string, AxiosResut<T[]>>(url);
        return response;
    };

    const get = async <T>(url: string) => {
        const response = await instance.get<string, AxiosResut<T[]>>(url);
        return response;
    };

    return [fetchPost, get];
};
