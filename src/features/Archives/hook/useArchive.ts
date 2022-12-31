import { useEffect } from 'react';
import {
    atomFamily,
    DefaultValue,
    selectorFamily,
    useRecoilStateLoadable,
} from 'recoil';
import { Data } from '@/src/types/api';

//---------------------------------------------------------------------------

type timeRangetype = {
    EndTime: string;
    BeginTime: string;
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

const fetchArchives = async (
    channelId: string
): Promise<Data<GoogleApiYouTubeSearchResource>> => {
    const query = createQuery(channelId);
    return await fetch(`/api/archives&${query}`).then(async (response) => {
        return await response.json();
    });
};

//---------------------------------------------------------------------------

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
            return (
                get(archivesAtom(channelId)) || (await fetchArchives(channelId))
            );
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

const timeRangeSelector = selectorFamily<timeRangetype, string>({
    key: 'next-timerange-selector',
    get:
        (channelId: string) =>
        ({ get }) => {
            const archives = get(archivesSelector(channelId));
            const lastArchivesLiveDayTime =
                archives.slice(-1)[0].snippet.publishedAt;
            return createTimeRange(lastArchivesLiveDayTime);
        },
});

//---------------------------------------------------------------------------

//---------------------------------------------------------------------------

export const useArchives = (channelId: string) => {
    const [response, setArchives] = useRecoilStateLoadable(
        archivesSelector(channelId)
    );

    useEffect(() => {
        setArchives(response.getValue());
    }, []);

    const fetch = async () => {
        const archive = await fetchArchives(channelId);
        setArchives(archive);
    };

    return [response.getValue(), fetch] as const;
};
