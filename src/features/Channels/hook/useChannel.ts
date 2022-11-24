import { useEffect } from 'react';
import { atom, DefaultValue, selector, useRecoilStateLoadable } from 'recoil';
import { HikasenVtuber } from '@/src/features/Channels/types';
import { AxiosResut } from '@/src/types/api/index';

//--------------------------------------------//

const fetchChannels = async (): Promise<HikasenVtuber[]> => {
    return await fetch('/api/hello').then(async (response) => {
        const test = (await response.json()) as HikasenVtuber[];
        return test;
    });
};

//--------------------------------------------//

const ChannelsAtom = atom<HikasenVtuber[]>({
    key: 'Channels-atom',
    default: [],
});

const ChannelsSelector = selector<HikasenVtuber[]>({
    key: 'channels.selector',
    get: async ({ get }) => {
        return get(ChannelsAtom) || (await fetchChannels());
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
