import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { HikasenVtuber } from '../types/index';

const axiosGASInstance = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 2000,
});

const onSuccessful = (response: AxiosResponse) => {
    return response;
};

const onRejected = (error: AxiosError) => {
    return Promise.reject(error);
};

axiosGASInstance.interceptors.response.use(onSuccessful, onRejected);

const ChannelsAtom = atom<HikasenVtuber[]>({
    key: 'ChannelsAtom',
    default: [],
});

interface IPostRequest {
    state: string;
}

interface IResponse {
    id: string;
    name: string;
}

interface IErrorResponse {
    error: string;
}

const requestData: IPostRequest = {
    state: 'Active',
};

const fetchChannels = async () => {
    try {
        const url = '';
        const response = await axiosGASInstance.post<IResponse>('/channel');
        return response;
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
    }
};

export const useChannels = () => {
    const [channels, setChannels] = useRecoilState(ChannelsAtom);
    useEffect(() => {
        setChannels(fetchChannels());
    }, []);
};
