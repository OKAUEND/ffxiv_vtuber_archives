import { useEffect } from 'react';
import { atom, DefaultValue, selector, useRecoilState } from 'recoil';
import { HikasenVtuber } from '../types/index';
import { get as axiosGet } from '../../../utility/axios';
import { AxiosResut } from '../../../types/api/index';

const ChannelsAtom = atom<HikasenVtuber[]>({
    key: 'Channels-atom',
    default: [],
});

const ResultStatusAtom = atom<Omit<AxiosResut<HikasenVtuber[]>, 'payload'>>({
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
                import.meta.env.CHANNEL_LIST_SPREADSHEET_URL
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

const ResponseResultSelector = selector<
    Omit<AxiosResut<HikasenVtuber[]>, 'payload'>
>({
    key: 'GAS-Response-selector',
    get: async ({ get }) => {
        return get(ResultStatusAtom);
    },
    set: ({ set }, newStatus) => {
        if (newStatus instanceof DefaultValue) {
            return newStatus;
        } else {
            set(ResultStatusAtom, newStatus);
        }
    },
});

export const useChannels = () => {
    const [channels, store] = useRecoilState(ChannelsSelector);
    const [resultStatus, setresultStatus] = useRecoilState(
        ResponseResultSelector
    );

    useEffect(() => {
        store(channels);
    }, []);

    const reload = async (): Promise<void> => {
        store([]);
    };

    return [channels, resultStatus, reload] as const;
};
