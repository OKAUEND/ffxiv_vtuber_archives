import axios, { AxiosAdapter, AxiosError, AxiosResponse } from 'axios';
import { AxiosResut } from '../../types/api/index';

export const axiosInstance = axios.create({
    baseURL: '',
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

axiosInstance.interceptors.response.use(onSuccessful, onRejected);

export const fetchPost = async <T>(url: string) => {
    const response = await axiosInstance.post<string, AxiosResut<T[]>>(url);
    return response;
};

export const get = async <T>(url: string) => {
    const response = await axiosInstance.get<string, AxiosResut<T[]>>(url);
    return response;
};
