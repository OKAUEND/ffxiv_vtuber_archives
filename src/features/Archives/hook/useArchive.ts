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

type timeRangetype = {
    EndTime: string;
    BeginTime: string;
};

type Archive = GoogleApiYouTubeSearchResource;

type ArchiveListState = {
    archives: readonly Archive[];
    mightHaveMore: boolean;
};

//---------------------------------------------------------------------------

export const createQuery = (channelId: string): string => {
    const part = 'snippet';
    const maxResult = 50;
    const order = 'date';
    const query = 'FF14';

    return `channelId=${channelId}&part=${part}&order=${order}&q=${query}&maxResults=${maxResult}`;
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

const archiveListQuery = selectorFamily<
    Archive,
    { limit: number; offset: number }
>({
    key: 'data-flow/archiveListQuery',
    get:
        ({ limit, offset }) =>
        async () => {
            const result = await axios
                .get<Archive[]>('TEST')
                .catch((error) => {});
        },
});
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------

export const useArchives = (channelId: string) => {
    return [] as const;
};
