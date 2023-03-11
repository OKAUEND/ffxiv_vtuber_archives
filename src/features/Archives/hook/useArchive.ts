import { useEffect } from 'react';
import {
    atom,
    atomFamily,
    DefaultValue,
    noWait,
    selector,
    selectorFamily,
    useRecoilState,
} from 'recoil';
import { Data } from '@/src/types/api';
import { useError } from '@/src/hooks/error';
import axios from 'axios';

//---------------------------------------------------------------------------

type Archive = GoogleApiYouTubeSearchResource;

type YoutubeResult =
    GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>;

type ArchiveListState = {
    archives: readonly Archive[];
    mightHaveMore: boolean;
};

type QueryInput = {
    channelId: string;
    latetime: string;
};

//---------------------------------------------------------------------------

export const createQuery = ({ channelId, latetime }: QueryInput): string => {
    const part = 'snippet';
    const order = 'date';
    const query = 'FF14';

    return `channelId=${channelId}&part=${part}&order=${order}&q=${query}&maxResults=${pageSize}`;
};

const createLastArchiveTime = (Archive: Archive[]): string => {
    const baseTime = new Date(Archive.slice(-1)[0].snippet.publishedAt);
    const targetTime = new Date(baseTime.getTime() - 60 * 1000);
    return targetTime.toISOString();
};

const converRawResultToArchives = (response: YoutubeResult): Archive[] => {
    return response.items;
};

//---------------------------------------------------------------------------

const pageSize = 25;

//---------------------------------------------------------------------------

const totalItems = atom({
    key: 'data-flow/archiveList/totalItems',
    default: pageSize,
});

//---------------------------------------------------------------------------

const archiveList = selector<ArchiveListState>({
    key: 'data-flow/archiveList',
    get: ({ get }) => {
        const chunks: (readonly Archive[])[] = [];
        const requestedItems = get(totalItems);
        let mightHaveMore = true;
        mainLoop: for (let offset = 0; offset < requestedItems; ) {
            const limit = Math.min(requestedItems - offset, pageSize);
            const youtubeArchive = get(
                noWait(archiveListQuery({ limit, offset }))
            );

            switch (youtubeArchive.state) {
                case 'hasError': {
                    throw youtubeArchive.errorMaybe();
                }
                case 'hasValue': {
                }
                case 'loading': {
                }
            }
        }
    },
});

const archiveListQuery = selectorFamily<YoutubeResult, QueryInput>({
    key: 'data-flow/archiveListQuery',
    get:
        ({ channelId, latetime }) =>
        async () => {
            try {
                const query = createQuery({ channelId, latetime });
                const result = await axios.get<YoutubeResult>('TEST');
                return result.data;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                }
            }
        },
});

//
const formattedVtuberArchiveQuery = selectorFamily<Archive[], QueryInput>({
    key: 'data-flow/archiveListQuery',
    get:
        (query) =>
        ({ get }) => {
            return converRawResultToArchives(get(archiveListQuery(query)));
        },
});

//---------------------------------------------------------------------------

//---------------------------------------------------------------------------

export const useArchives = (channelId: string) => {
    return [] as const;
};
