import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { HikasenVtuber } from '../types/index';
import { get } from '../../../utility/axios';
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
    const [channels, setChannels] = useRecoilState(ChannelsAtom);
    const [resultStatus, setresultStatus] = useRecoilState(ResultStatus);

    useEffect(() => {
        if (channels.length > 0) return;
        loadData();
    }, []);

    const loadData = async () => {
        const result = await get<HikasenVtuber[]>(
            'https://script.google.com/macros/s/AKfycbzafCzaTYaPbHBS5x3MQsJ5ykBspxb481rRgMQvSpULsPFgqbyAr1wXcRXd_Gvg0WUbRg/exec'
        );
        setChannels(result.payload);
        setresultStatus(result);
    };

    return [channels, resultStatus, loadData] as const;
};
