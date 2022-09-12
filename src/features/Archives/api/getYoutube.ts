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

            if (Archives.length > 0) return filterContent(Archives);

            const time = new Date().toISOString();
            const url = createYoutubeURL(
                channelId,
                createYoutubeQuery(createTimeRange(time))
            );

            const response = await axiosGet<
                GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>
            >(url);

            return filterContent(response.payload.items);
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

            return filterContent(request.payload.items);
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
            //配列最後から次の期間までの動画を取りたいので、最後の動画の日付を取得する
            const lastArchivesLiveDayTime =
                archives.slice(-1)[0].snippet.publishedAt;
            //期間開始日付と終わり日付の2つの日付を作成してオブジェクトで返す
            return createTimeRange(lastArchivesLiveDayTime);
        },
});

//---------------------------------------------------------------------------

const createTimeRange = (BeginLiveDayTime: string): timeRangetype => {
    const lastArchiveTime = new Date(BeginLiveDayTime);
    //現在最後尾にある動画の日付をそのまま使うと、再び同じ動画の情報が取得されるので、1分だけ巻き戻す事で回避する。
    lastArchiveTime.setMinutes(lastArchiveTime.getMinutes() - 1);
    const EndTime = lastArchiveTime.toISOString();
    //とりあえず半年前の日付に指定する。
    //半年前でも3ヶ月までも、APIのコール数はそれほど変わらない。
    lastArchiveTime.setMonth(lastArchiveTime.getMonth() - 6);
    const BeginTime = lastArchiveTime.toISOString();

    return { EndTime, BeginTime };
};

/**
 * Youtube Data API へのクエリを作成する
 * @param timeRange
 * @returns Query
 */
export const createYoutubeQuery = (timeRange: timeRangetype): string => {
    const part = 'snippet';
    const APIKey = import.meta.env.VITE_YOUTUBE_API;
    const maxResult = 50;
    const order = 'date';
    const query = 'FF14';

    return `&part=${part}&order=${order}&q=${query}&publishedBefore=${timeRange.EndTime}&publishedAfter=${timeRange.BeginTime}&maxResults=${maxResult}&key=${APIKey}`;
};

/**
 * Youtube Data APIへのAPIコールを行うURLを作成する
 * @param channelId
 * @param query
 * @returns Youtube Data API URL
 */
export const createYoutubeURL = (channelId: string, query: string): string => {
    return `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}${query}`;
};

/**
 * アーカイブ動画の中で、FF14以外の動画を除外する
 * 説明文に「FF14」の単語があるだけで、APIの返値に含まれるのでフロント側でフィルタリングが必要
 */
const filterContent = (
    archives: GoogleApiYouTubeSearchResource[]
): GoogleApiYouTubeSearchResource[] => {
    const RegFFXIV = /FFXIV|FF14/;
    return archives.filter((archive) => {
        //削除されたアーカイブも含まれるため、その場合はvideoIdをチェックすることで弾く事ができる
        if (archive.id.videoId === undefined) return false;
        //タイトル名にFF14が含まれていない物は、別ゲームか他の配信なので除外する
        return archive.snippet.title.match(RegFFXIV);
    });
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
