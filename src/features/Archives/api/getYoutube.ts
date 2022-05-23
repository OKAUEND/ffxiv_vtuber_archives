import { useEffect } from 'react';
import {
    atom,
    atomFamily,
    DefaultValue,
    selector,
    selectorFamily,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';

import { get as axiosGet } from '../../../utility/axios';

//---------------------------------------------------------------------------

type timeRangetype = {
    EndTime: string;
    BeginTime: string;
};

//---------------------------------------------------------------------------

const requestQueryAtom = atom<string>({
    key: 'requestQuery',
    default: '',
});

const archivesAtom = atomFamily<GoogleApiYouTubeSearchResource[], string>({
    key: 'archivesAtom',
    default: [],
});

//---------------------------------------------------------------------------

const archivesSelector = selectorFamily<
    GoogleApiYouTubeSearchResource[],
    string
>({
    key: 'archivesSelector',
    get:
        (channelId: string) =>
        ({ get }) => {
            const Archives = get(archivesAtom(channelId));
            return Archives;
        },
    set:
        (channelId: string) =>
        ({ set }, newArchives) => {
            if (newArchives instanceof DefaultValue) return;

            set(archivesAtom(channelId), (prev) => {
                return [...prev, ...newArchives];
            });
        },
});

export const youtubeSelector = selector<GoogleApiYouTubeSearchResource[]>({
    key: 'youtubeAPI',
    get: async ({ get }) => {
        const requestQuery = get(requestQueryAtom);

        if (requestQuery === '') return [];

        const request = await axiosGet<
            GoogleApiYouTubePageInfo<GoogleApiYouTubeSearchResource>
        >(requestQuery);

        return request.payload.items;
    },
});

const querySelector = selector<string>({
    key: 'youtube-query-selector',
    get: ({ get }) => {
        return get(requestQueryAtom);
    },
    set: ({ set }, newQuery) => {
        set(requestQueryAtom, newQuery);
    },
});

//---------------------------------------------------------------------------

export const createYoutubeQuery = (
    channelState: string,
    timeRange: timeRangetype
): string => {
    const part = 'snippet';
    const APIKey = 'AIzaSyA1fa9aKhYCs86Mcr-Tpy8BcQ83HAq1QrE';
    const maxResult = 50;
    const order = 'date';
    const query = 'FF14';

    return `https://www.googleapis.com/youtube/v3/search?part=${part}&channelId=${channelState}&order=${order}&q=${query}&publishedBefore=${timeRange.EndTime}&publishedAfter=${timeRange.BeginTime}&maxResults=${maxResult}&key=${APIKey}`;
};

const createTimeRange = (BeginLiveDayTime: string): timeRangetype => {
    const lastArchiveTime = new Date(BeginLiveDayTime);
    lastArchiveTime.setMinutes(lastArchiveTime.getMinutes() - 1);
    const EndTime = lastArchiveTime.toISOString();
    lastArchiveTime.setMonth(lastArchiveTime.getMonth() - 6);
    const BeginTime = lastArchiveTime.toISOString();

    return { EndTime, BeginTime };
};

//---------------------------------------------------------------------------

export const useYoutube = (channelId: string) => {
    const response = useRecoilValue(youtubeSelector);
    const [, setQuery] = useRecoilState(querySelector);

    const updateQuery = (BeginLiveDayTime: string): void => {
        const timeRange = createTimeRange(BeginLiveDayTime);
        const query = createYoutubeQuery(channelId, timeRange);

        setQuery(query);
    };

    return [response, updateQuery] as const;
};

export const getYoutube = () => {};
