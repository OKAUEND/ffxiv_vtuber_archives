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

type Offset = {
    channelId: string;
    beginTime: string;
    requestedItems: number;
    offset: number;
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

const createLastArchiveTime = (Archive?: Archive[]): string => {
    //引数が存在しないか、存在しても長さが0だった場合、現在時刻を基準にする
    if (!Archive || Archive.length === 0) {
        return new Date().toISOString();
    }
    //配列最後列の動画の日時より1分前を設定する
    //1分前にしないと、重複した動画を再取得してしまうため
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

const totalItems = atomFamily({
    key: 'data-flow/archiveList/totalItems',
    default: pageSize,
});

//---------------------------------------------------------------------------

const archiveListQuery = selectorFamily<YoutubeResult, QueryInput>({
    key: 'data-flow/archiveListQuery',
    get:
        ({ channelId, beginTime }) =>
        async () => {
            try {
                const query = createQuery({ channelId, beginTime });
                const result = await axios.get<YoutubeResult>(
                    'vitest.live.com'
                );
                console.log({ result });
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

const archiveListRecursion = selectorFamily<ArchiveListState, Offset>({
    key: 'data-flow/archiveListRecursion',
    get:
        ({ channelId, beginTime, requestedItems, offset }) =>
        ({ get }) => {
            const limit = Math.min(requestedItems - offset, pageSize);

            //現在のチャンネルIDと取得開始時間を渡し、YoutubeAPIから過去のライブを取得する
            const youtubeArchive = get(
                formattedVtuberArchiveQuery({
                    channelId,
                    beginTime,
                })
            );

            //取得した配列の長さが、今回取得する上限数より小さかったら、すべて取得したと判断
            if (youtubeArchive.length < limit) {
                return {
                    archives: youtubeArchive,
                    mightHaveMore: false,
                };
            }

            //今回の要求数と一致していたら、取得を終了
            if (requestedItems === offset + limit) {
                return {
                    archives: youtubeArchive,
                    mightHaveMore: true,
                };
            }

            //条件を満たさなかった場合、更に取得する必要があるため、自身を呼び出し再帰ループに入る
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

const archiveList = selectorFamily<ArchiveListState, string>({
    key: 'data-flow/archiveList',
    get:
        (channelId) =>
        ({ get }) => {
            const beginTime = createLastArchiveTime();
            return get(
                archiveListRecursion({
                    channelId,
                    beginTime,
                    requestedItems: get(totalItems(channelId)),
                    offset: 0,
                })
            );
        },
});

//---------------------------------------------------------------------------

//---------------------------------------------------------------------------

export const useArchives = (channelId: string) => {
    return [] as const;
};
