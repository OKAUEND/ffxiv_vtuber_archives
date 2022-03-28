import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { HikasenVtuber } from '../types/index';
import { AxiosResut } from '../../../types/api/index';

const axiosGASInstance = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 2000,
});

const onSuccessful = (response: AxiosResponse): AxiosResut<HikasenVtuber[]> => {
    const result: AxiosResut<HikasenVtuber[]> = {
        status: response.status,
        payload: response.data,
    };
    return result;
};

const onRejected = (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
        const result: AxiosResut<HikasenVtuber[]> = {
            status: 408,
            error: true,
            errorCode: 'TIMEOUT',
            payload: [],
        };
        return result;
    }

    return Promise.reject('error');
};

axiosGASInstance.interceptors.response.use(onSuccessful, onRejected);

const ChannelsAtom = atom<HikasenVtuber[]>({
    key: 'ChannelsAtom',
    default: [],
});

const ResultStatus = atom<Omit<AxiosResut<HikasenVtuber[]>, 'payload'>>({
    key: 'AxiosResutAtom',
    default: { status: 200 },
});

export const fetchChannels = async () => {
    const url = '';
    const response = await axiosGASInstance.post<
        string,
        AxiosResut<HikasenVtuber[]>
    >('/channel');
    return response.payload;
};

export const useChannels = () => {
    const [channels, setChannels] = useRecoilState(ChannelsAtom);
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setChannels(await fetchChannels());
    };

    return [channels, loadData] as const;
};
