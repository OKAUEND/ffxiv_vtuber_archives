import { useEffect } from 'react';
import {
    atom,
    atomFamily,
    DefaultValue,
    noWait,
    selector,
    selectorFamily,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import { Data } from '@/src/types/api';
import { useError } from '@/src/hooks/error';
import axios, { AxiosError } from 'axios';

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

const archiveListRecursion = selectorFamily<
    ArchiveListState,
    {
        channelId: string;
        beginTime: string;
        requestedItems: number;
        offset: number;
    }
>({
    key: 'data-flow/archiveListRecursion',
    get:
        ({ channelId, beginTime, requestedItems, offset }) =>
        ({ get }) => {
            const limit = Math.min(requestedItems - offset, pageSize);
            const youtubeArchive = get(
                formattedVtuberArchiveQuery({
                    channelId,
                    beginTime,
                })
            );

            if (youtubeArchive.length < limit) {
                return {
                    archives: youtubeArchive,
                    mightHaveMore: false,
                };
            }

            if (requestedItems === offset + limit) {
                return {
                    archives: youtubeArchive,
                    mightHaveMore: true,
                };
            }

            const rest = get(
                noWait(
                    archiveListRecursion({
                        channelId,
                        beginTime,
                        requestedItems,
                        offset: offset + limit,
                    })
                )
            );
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
