import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { HikasenVtuber } from '../types/index';
import { AxiosInstance } from '../../../utility/axios';
import { AxiosResut } from '../../../types/api/index';

const ChannelsAtom = atom<HikasenVtuber[]>({
    key: 'ChannelsAtom',
    default: [],
});

const ResultStatus = atom<Omit<AxiosResut<HikasenVtuber[]>, 'payload'>>({
    key: 'AxiosResutAtom',
    default: { status: 200 },
});

export const useChannels = () => {
    const fetchPost = AxiosInstance<HikasenVtuber>();
    const [channels, setChannels] = useRecoilState(ChannelsAtom);
    const [resultStatus, setresultStatus] = useRecoilState(ResultStatus);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const result = await fetchPost('/channel');
        setChannels(result.payload);
        setresultStatus(result);
    };

    return [channels, resultStatus, loadData] as const;
};
