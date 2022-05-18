import { useEffect } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

import { get as axiosGet } from '../../../utility/axios';


export const createYoutubeQuery = (
    channelState: string,
    beginTime: string,
    endTime: string
): string => {
    const part = 'snippet';
    const APIKey = '';
    const maxResult = 50;
    const order = 'date';
    const query = 'FF14';

    return `https://www.googleapis.com/youtube/v3/search?part=${part}&channelId=${channelState}&order=${order}&q=${query}&publishedBefore=${endTime}&publishedAfter=${beginTime}&maxResults=${maxResult}&key=${APIKey}`;
};

export const fetchYoutube = async (query: string) => {
    const response = await get<
        GoogleApiYouTubePageInfo<GoogleApiYouTubeSearchResource>
    >(query);
    return response.payload.items;
};

const requestQueryAtom = atom<string>({
    key: 'requestQuery',
    default: '',
});

export const youtubeSelector = selector<GoogleApiYouTubeSearchResource[]>({
    key: 'youtubeAPI',
    get: async ({ get }) => {
        const requestQuery = get(querySelector);

        if (requestQuery === '') return [];

        const request = await axiosGet<GoogleApiYouTubeSearchResource[]>(
            requestQuery
        );

        return request.payload;
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

export const useYoutube = () => {
    const result = useRecoilValue(youtubeSelector);
    const setYoutubeQuery = useSetRecoilState(requestQueryAtom);

    const setQuery = (
        channelId: string,
        beginTime: string,
        endTime: string
    ) => {
        const query = createYoutubeQuery(channelId, beginTime, endTime);
        setYoutubeQuery(query);
    };

    return [result, setQuery] as const;
};
