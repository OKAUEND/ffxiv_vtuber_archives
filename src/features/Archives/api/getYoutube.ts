import axios, { AxiosResponse, AxiosAdapter } from 'axios';
import { atom, selector, selectorFamily, useRecoilValue } from 'recoil';
import { timeRangeAtom } from '../hook/useTimeRange';
import { useArchives } from '../hook/useArchives';

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
    const APIKey = '';
    const maxResult = 50;
    const order = 'date';
    const query = 'FF14';

    return `?part=${part}&channelId=${channelState}&order=${order}&q=${query}&publishedBefore=${endTime}&publishedAfter=${beginTime}&maxResults=${maxResult}&key=${APIKey}`;
};

export const fetchYoutube = async (
    channelId: string,
    beginTime: string,
    endTime: string
) => {
    const query = createYoutubeQuery(channelId, beginTime, endTime);
    const response = await axiosYoutubeInstance.get<
        GoogleApiYouTubePageInfo<GoogleApiYouTubeSearchResource>
    >(query);
    return response.data.items;
};

export const currentChannelId = atom({
    key: 'channelId',
    default: 'UC6oDys1BGgBsIC3WhG1BovQ',
});

export const isPeriod = <T extends Date>(
    lastArchiveDayTime: T,
    BeginTime: T
): boolean => {
    return lastArchiveDayTime <= BeginTime;
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
    const [, setYoutubeQuery] = useRecoilState(requestQueryAtom);

    const setQuery = (
        channelId: string,
        beginTime: string,
        endTime: string,
        isload: boolean
    ) => {
        if (!isload) return;
        const query = createYoutubeQuery(channelId, beginTime, endTime);
        setYoutubeQuery(query);
    };

    return [result, setQuery];
};
