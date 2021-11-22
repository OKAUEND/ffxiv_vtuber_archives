import axios, { AxiosResponse } from 'axios';
import {
    atom,
    DefaultValue,
    selector,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';

import { Archives } from '../types';

type timeRangeState = {
    EndTime: string;
    BeginTime: string;
};

export const getArchives = <
    T extends GoogleApiYouTubePageInfo<GoogleApiYouTubeSearchResource>
>(
    channelState: string,
    timeRangeState: timeRangeState
): Promise<AxiosResponse<T, T>> => {
    const api_base = 'https://www.googleapis.com/youtube/v3/search';
    const part = 'snippet';
    const APIKey = 'AIzaSyDuzP-dEg-vqWkY1t4QvOySU7ExxRXJQjk';
    const maxResult = 50;
    const order = 'date';
    const query = 'FF14';

    // &publishedBefore=${endTime}&publishedAfter=${beginTime}
    return axios.get(
        `${api_base}?part=${part}&channelId=${channelState}&order=${order}&q=${query}&publishedBefore=${timeRangeState.EndTime}&publishedAfter=${timeRangeState.BeginTime}&maxResults=${maxResult}&key=${APIKey}`
    );
};

export const currentChannelIDState = atom({
    key: 'CurrentChannelID',
    default: 'UC6oDys1BGgBsIC3WhG1BovQ',
});

const DefaultDate = new Date();
const HalfMonth = new Date();
HalfMonth.setMonth(HalfMonth.getMonth() - 6);

export const timeRangeState = atom<timeRangeState>({
    key: 'TimeRange',
    default: {
        EndTime: DefaultDate.toISOString(),
        BeginTime: HalfMonth.toISOString(),
    },
});

export const ArchivesList = new Map<string, GoogleApiYouTubeSearchResource[]>();

export const setArchivesList = (
    key: string,
    newList: GoogleApiYouTubeSearchResource[]
) => {
    ArchivesList.set(key, newList);
};

export const useYoutubeAxios = selector({
    key: 'YoutubeAxios',
    get: async ({ get }) => {
        const channelState = get(currentChannelIDState);
        const timeState = get(timeRangeState);

        const response = await getArchives(channelState, timeState);
        return response.data.items;
    },
});

export const useArchives = selector<GoogleApiYouTubeSearchResource[]>({
    key: 'Archives',
    get: async ({ get }) => {
        const youtubeData = await get(useYoutubeAxios);
        const channelState = get(currentChannelIDState);

        return youtubeData;
    },
});
