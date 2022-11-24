import { useEffect } from 'react';
import { atom, DefaultValue, selector, useRecoilStateLoadable } from 'recoil';
import { HikasenVtuber } from '@/src/features/Channels/types';
import { AxiosResut } from '@/src/types/api/index';

const ChannelsAtom = atom<HikasenVtuber[]>({
    key: 'Channels-atom',
    default: [],
});

const ChannelsSelector = selector<HikasenVtuber[]>({
    key: 'Channels-selector',
    get: async ({ get }) => {
        const channels = get(ChannelsAtom);
        if (channels.length > 0) {
            return channels;
        } else {
            const response = await fetch('../api/channel');
            const channel = await response.json();

            return channel.payload;
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

//--------------------------------------------//

export const useChannels = () => {
    const [channels] =
        useRecoilStateLoadable<HikasenVtuber[]>(ChannelsSelector);
    // const [resultStatus, setresultStatus] = useRecoilState(
    //     ResponseResultSelector
    // );

    // useEffect(() => {
    //     store(channels);
    // }, []);

    // const reload = async (): Promise<void> => {
    //     store([]);
    // };

    return [channels.getValue()] as const;
};
