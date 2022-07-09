import { useEffect } from 'react';
import {
    atom,
    atomFamily,
    DefaultValue,
    selector,
    selectorFamily,
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from 'recoil';

import { get as axiosGet } from '../../../utility/axios';

//---------------------------------------------------------------------------

type timeRangetype = {
    EndTime: string;
    BeginTime: string;
};

//---------------------------------------------------------------------------

export const requestQueryAtom = atom<string>({
    key: 'requestQuery',
    default: '',
});

export const archivesAtom = atomFamily<
    GoogleApiYouTubeSearchResource[],
    string
>({
    key: 'archivesAtom',
    default: [],
});

//---------------------------------------------------------------------------

const archivesSelector = selectorFamily<
    GoogleApiYouTubeSearchResource[],
    string
>({
    key: 'archives-selector',
    get:
        (channelId: string) =>
        async ({ get }) => {
            const Archives = get(archivesAtom(channelId));

            if (Archives.length > 0) return Archives;

            const time = new Date().toISOString();
            const url = createYoutubeURL(
                channelId,
                createYoutubeQuery(createTimeRange(time))
            );

            const response = await axiosGet<
                GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>
            >(url);

            return response.payload.items;
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

export const youtubeSelector = selectorFamily<
    GoogleApiYouTubeSearchResource[],
    string
>({
    key: 'youtubeAPI',
    get:
        (channelId: string) =>
        async ({ get }) => {
            const requestQuery = get(querySelector);

            if (requestQuery === '') return [];

            const requestURL = createYoutubeURL(channelId, requestQuery);

            const request = await axiosGet<
                GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>
            >(requestURL);

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

const timeRangeSelector = selectorFamily<timeRangetype, string>({
    key: 'next-timerange-selector',
    get:
        (channelId: string) =>
        ({ get }) => {
            const archives = get(archivesSelector(channelId));
            const lastArchivesLiveDayTime =
                archives.slice(-1)[0].snippet.publishedAt;
            return createTimeRange(lastArchivesLiveDayTime);
        },
});

//---------------------------------------------------------------------------

export const createYoutubeQuery = (timeRange: timeRangetype): string => {
    const part = 'snippet';
    const APIKey = import.meta.env.VITE_YOUTUBE_API;
    const maxResult = 50;
    const order = 'date';
    const query = 'FF14';

    return `&part=${part}&order=${order}&q=${query}&publishedBefore=${timeRange.EndTime}&publishedAfter=${timeRange.BeginTime}&maxResults=${maxResult}&key=${APIKey}`;
};

const createTimeRange = (BeginLiveDayTime: string): timeRangetype => {
    const lastArchiveTime = new Date(BeginLiveDayTime);
    lastArchiveTime.setMinutes(lastArchiveTime.getMinutes() - 1);
    const EndTime = lastArchiveTime.toISOString();
    lastArchiveTime.setMonth(lastArchiveTime.getMonth() - 6);
    const BeginTime = lastArchiveTime.toISOString();

    return { EndTime, BeginTime };
};

export const createYoutubeURL = (channelId: string, query: string): string => {
    return `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}${query}`;
};

//---------------------------------------------------------------------------

export const useYoutube = (channelId: string) => {
    const response = useRecoilValue(youtubeSelector(channelId));
    const timeRange = useRecoilValue(timeRangeSelector(channelId));
    const setQuery = useSetRecoilState(querySelector);
    const setArchives = useSetRecoilState(archivesSelector(channelId));
    const resetQuery = useResetRecoilState(requestQueryAtom);

    useEffect(() => {
        setArchives(response);
        resetQuery();
    }, [response]);

    const updateQuery = (): void => {
        const query = createYoutubeQuery(timeRange);

        setQuery(query);
    };
    return [response, updateQuery] as const;
};

export const useArchives = (channelId: string) => {
    const [response, setArchives] = useRecoilState(archivesSelector(channelId));

    useEffect(() => {
        setArchives(response);
    }, []);

    return [response] as const;
};
