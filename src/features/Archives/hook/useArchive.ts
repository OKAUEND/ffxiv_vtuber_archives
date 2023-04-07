import { useEffect } from 'react';
import {
    atomFamily,
    noWait,
    selectorFamily,
    useRecoilCallback,
    useRecoilValue,
} from 'recoil';
import { Data } from '@/src/types/api';
import { useError } from '@/src/hooks/error';
import axios, { AxiosError } from 'axios';

//---------------------------------------------------------------------------

type Archive = GoogleApiYouTubeSearchResource;

type YoutubeDate =
    GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>;

type ApiResult = {
    item: YoutubeDate;
    status: number;
};

type ArchiveListState = {
    archives: readonly Archive[];
    mightHaveMore: boolean;
};

type Offset = {
    channelId: string;
    beginTime?: string;
    requestedItems: number;
    offset: number;
};

type QueryInput = {
    channelId: string;
    beginTime: string;
};
//---------------------------------------------------------------------------

/**
 * 1ページで読み込みを行う値
 */
export const pageSize = 25;

/**
 * 検索したいクエリワード
 */
const queryWorld = `FF14|FFXIV`;

//---------------------------------------------------------------------------

export const createQuery = ({
    channelId,
    beginTime = new Date().toISOString(),
}: QueryInput): string => {
    const part = 'snippet';
    const order = 'date';

    const DOMAIN = process.env.NEXT_PUBLIC_HOST;
    return `${DOMAIN}/api/archives?channelId=${channelId}&publishedBefore=${beginTime}&part=${part}&order=${order}&q=${queryWorld}&maxResults=${pageSize}`;
};

const createLastArchiveTime = (Archive?: Archive[]): string => {
    //配列最後列の動画の日時より1分前を設定する
    //1分前にしないと、重複した動画を再取得してしまうため
    const baseTime = new Date(Archive.slice(-1)[0].snippet.publishedAt);
    const targetTime = new Date(baseTime.getTime() - 60 * 1000);
    return targetTime.toISOString();
};

const converRawResultToArchives = (response: YoutubeDate): Archive[] => {
    return response.items;
};

//---------------------------------------------------------------------------

/**
 * 配信者毎に現在読み込みを行った現在値
 */
export const totalItems = atomFamily({
    key: 'data-flow/archiveList/totalItems',
    default: pageSize,
});

//---------------------------------------------------------------------------

const archiveListQuery = selectorFamily<YoutubeDate, QueryInput>({
    key: 'data-flow/archiveListQuery',
    get:
        ({ channelId, beginTime }) =>
        async () => {
            try {
                const query = createQuery({ channelId, beginTime });
                const result = await axios.get<ApiResult>(query);
                return result.data.item;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                }
            }
        },
});

//
const formattedVtuberArchiveQuery = selectorFamily<
    { filteredArchive: Archive[]; originalLength: number },
    QueryInput
>({
    key: 'data-flow/archiveListQuery',
    get:
        (query) =>
        ({ get }) => {
            const archives = converRawResultToArchives(
                get(archiveListQuery(query))
            );
            //概要欄にFF14関連の記載がある場合、Queryで絞っていても該当するため、
            //改めてここでFF14のみに絞り込む
            const reg = new RegExp(queryWorld);
            const filteredArchive = archives.filter((archive) => {
                return reg.test(archive.snippet.title);
            });

            return {
                filteredArchive: filteredArchive,
                originalLength: archives.length,
            };
        },
});

const archiveListRecursion = selectorFamily<ArchiveListState, Offset>({
    key: 'data-flow/archiveListRecursion',
    get:
        ({ channelId, beginTime, requestedItems, offset }) =>
        ({ get }): ArchiveListState => {
            const limit = Math.min(requestedItems - offset, pageSize);

            //現在のチャンネルIDと取得開始時間を渡し、YoutubeAPIから過去のライブを取得する
            const youtubeArchive = get(
                formattedVtuberArchiveQuery({
                    channelId,
                    beginTime,
                })
            );

            //取得した配列の長さが、今回取得する上限数より小さかったら、すべて取得したと判断
            if (youtubeArchive.originalLength < limit) {
                return {
                    archives: youtubeArchive.filteredArchive,
                    mightHaveMore: false,
                };
            }

            //今回の要求数と一致していたら、取得を終了
            if (requestedItems === offset + limit) {
                return {
                    archives: youtubeArchive.filteredArchive,
                    mightHaveMore: true,
                };
            }

            const lastArchiveTime = createLastArchiveTime(
                youtubeArchive.filteredArchive
            );

            //条件を満たさなかった場合、更に取得する必要があるため、自身を呼び出し再帰ループに入る
            const rest = get(
                noWait(
                    archiveListRecursion({
                        channelId,
                        beginTime: lastArchiveTime,
                        requestedItems,
                        offset: offset + limit,
                    })
                )
            );

            //ReactのトランジクションはRecoilはまだ対応していないため、Lodableで対応する
            switch (rest.state) {
                case 'hasError': {
                    throw rest.errorMaybe();
                }
                case 'loading': {
                    return {
                        archives: youtubeArchive.filteredArchive,
                        mightHaveMore: true,
                    };
                }
                case 'hasValue': {
                    return {
                        //読み込みが完了した場合、配列をマージしリターンで戻っていく
                        archives: [
                            ...youtubeArchive.filteredArchive,
                            ...rest.contents.archives,
                        ],
                        mightHaveMore: rest.contents.mightHaveMore,
                    };
                }
            }
        },
});

const archiveList = selectorFamily<ArchiveListState, string>({
    key: 'data-flow/archiveList',
    get:
        (channelId) =>
        ({ get }) => {
            return get(
                archiveListRecursion({
                    channelId,
                    requestedItems: get(totalItems(channelId)),
                    offset: 0,
                })
            );
        },
});

//---------------------------------------------------------------------------

//---------------------------------------------------------------------------
/**
 *
 * @param channelId 対象の配信者のYoutubeChannelID
 * @returns {Array} 取得済みの過去配信(アーカイブ)
 */
export const useArchives = (channelId: string) => {
    const archive = useRecoilValue(archiveList(channelId));

    /**
     * 取得件数を一定数インクリメントする
     * @param channelId sting 現在の配信者チャンネルID
     */
    const loadNextList = useRecoilCallback(({ set }) => (channelId: string) => {
        set(totalItems(channelId), (count) => count + pageSize);
    });

    const decrementPageSize = useRecoilCallback(
        ({ set }) =>
            (channelId: string) => {
                set(totalItems(channelId), (count) => count - pageSize);
            }
    );
    return { ...archive, loadNextList, decrementPageSize };
};

/**
 *
 * @returns {Void} 現在の要求数をインクリメントする関数
 */
export const usePage = () => {
    /**
     * 取得予定件数をインクリメントする
     * @param channelId sting 現在の配信者チャンネルID
     */
    const loadNextList = useRecoilCallback(({ set }) => (channelId: string) => {
        set(totalItems(channelId), (count) => count + pageSize);
    });
    /**
     * 取得予定件数をデクリメントする
     * @param channelId sting 現在の配信者チャンネルID
     */
    const decrementPageSize = useRecoilCallback(
        ({ set }) =>
            (channelId: string) => {
                set(totalItems(channelId), (count) => count - pageSize);
            }
    );
    return [loadNextList, decrementPageSize];
};
