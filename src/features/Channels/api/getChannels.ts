import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { HikasenVtuber } from '../types/index';
import { get } from '../../../utility/axios';
import { AxiosResut } from '../../../types/api/index';

const ChannelsAtom = atom<HikasenVtuber[]>({
    key: 'Channels-atom',
    default: [],
});

const ResultStatus = atom<Omit<AxiosResut<HikasenVtuber[]>, 'payload'>>({
    key: 'AxiosResut-atom',
    default: { status: 200 },
});

const ChannelsSelector = selector<HikasenVtuber[]>({
    key: 'Channels-selector',
    get: async ({ get }) => {
        const channels = get(ChannelsAtom);
        if (channels.length > 0) {
            return channels;
        } else {
            const request = await axiosGet<HikasenVtuber[]>(
                'https://script.google.com/macros/s/AKfycbzafCzaTYaPbHBS5x3MQsJ5ykBspxb481rRgMQvSpULsPFgqbyAr1wXcRXd_Gvg0WUbRg/exec'
            );

            return request.payload;
        }
    },
    set: ({ set }, newChannels) => {
        if (newChannels instanceof DefaultValue) {
            return newChannels;
        } else {
            set(ChannelsAtom, newChannels);
        }
    },
});

export const useChannels = () => {
    const [channels, store] = useRecoilState(ChannelsSelector);
    const [resultStatus, setresultStatus] = useRecoilState(ResultStatus);

    useEffect(() => {
        store(channels);
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
