import axios from 'axios';
import { useEffect } from 'react';
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';

export const axiosYoutubeInstance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/search',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 2000,
});

export const createYoutubeQuery = (
    channelState: string,
    beginTime: string,
    endTime: string
): string => {
    const part = 'snippet';
    const APIKey = 'AIzaSyC0-oYyGcaa0UV4fOHVUhWvXM2KXcf_V5A';
    const maxResult = 50;
    const order = 'date';
    const query = 'FF14';

    return `?part=${part}&channelId=${channelState}&order=${order}&q=${query}&publishedBefore=${endTime}&publishedAfter=${beginTime}&maxResults=${maxResult}&key=${APIKey}`;
};

export const fetchYoutube = async (query: string) => {
    const response = await axiosYoutubeInstance.get<
        GoogleApiYouTubePageInfo<GoogleApiYouTubeSearchResource>
    >(query);
    return response.data.items;
};

const requestQueryAtom = atom<string>({
    key: 'requestQuery',
    default: '',
});

export const youtubeSelector = selector<GoogleApiYouTubeSearchResource[]>({
    key: 'youtubeAPI',
    get: async ({ get }) => {
        const requestQuery = get(requestQueryAtom);

        if (requestQuery === '') return [];

        return await fetchYoutube(requestQuery);
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
