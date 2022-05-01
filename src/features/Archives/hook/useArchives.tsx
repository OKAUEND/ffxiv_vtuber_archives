import { atomFamily, useRecoilState, useRecoilCallback } from 'recoil';
export const archivesAtom = atomFamily<
    GoogleApiYouTubeSearchResource[],
    string
>({
    key: 'archives',
    default: [],
});

const archivesSelector = selectorFamily<
    GoogleApiYouTubeSearchResource[],
    string
>({
    key: 'archivesSelector',
    get:
        (channelId: string) =>
        ({ get }) => {
            return get(archivesAtom(channelId));
        },
});

export const useArchives = (channelId: string) => {
    const Archives = useRecoilValue(archivesSelector(channelId));
    const setArchives = useSetRecoilState(archivesAtom(channelId));

    const lastArchivesDayTime = () => {
        return Archives.length === 0
            ? new Date().toISOString()
            : Archives.slice(-1)[0].snippet.publishedAt;
    };

    const addArchives = (newArchives: GoogleApiYouTubeSearchResource[]) => {
        setArchives([...Archives, ...newArchives]);
    };

    const exists = () => {
        return Archives.length > 0;
    };

    return [Archives, lastArchivesDayTime, addArchives, exists] as const;
};
