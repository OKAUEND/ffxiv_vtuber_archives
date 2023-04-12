import { useEffect } from 'react';
import { atom, DefaultValue, selector, useRecoilStateLoadable } from 'recoil';
import { HikasenVtuber } from '@/src/features/Channels/types';

//--------------------------------------------//

const HOST = process.env.NEXT_PUBLIC_HOST;

//--------------------------------------------//

const fetchChannels = async (): Promise<HikasenVtuber[]> => {
    return await fetch(`${HOST}/api/channel`).then(async (response) => {
        return (await response.json()) as HikasenVtuber[];
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
        return get(ChannelsAtom);
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

export const useChannels = (firstPage: HikasenVtuber[]) => {
    const [channels, setChannels] =
        useRecoilStateLoadable<HikasenVtuber[]>(ChannelsSelector);
    // const [resultStatus, setresultStatus] = useRecoilState(
    //     ResponseResultSelector
    // );

    useEffect(() => {
        setChannels(firstPage);
    }, []);

    // const reload = async (): Promise<void> => {
    //     store([]);
    // };

    return [channels.getValue()] as const;
};
