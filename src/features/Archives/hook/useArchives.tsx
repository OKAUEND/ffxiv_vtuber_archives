import { atomFamily, useRecoilState, useRecoilCallback } from 'recoil';
export const archivesAtom = atomFamily<
    GoogleApiYouTubeSearchResource[],
    string
>({
    key: 'ArchivesAtom',
    default: [],
});

const archivesSelector = selectorFamily<
    GoogleApiYouTubeSearchResource[],
    string
>({
    key: 'archives-selector',
    get:
        (channelId: string) =>
        ({ get }) => {
            return get(archivesAtom(channelId));
        },
    set:
        (channelId: string) =>
        ({ set }, newArchives) => {
            if (newArchives instanceof DefaultValue) return;
            set(archivesAtom(channelId), (prev) => [...prev, ...newArchives]);
        },
});

export const useArchives = (channelId: string) => {
    const [Archives] = useRecoilState(archivesAtom(channelId));

    const lastArchivesDayTime = () => {
        return Archives.length === 0
            ? new Date().toISOString()
            : Archives.slice(-1)[0].snippet.publishedAt;
    };

    const addArchives = useRecoilCallback(
        ({ set }) =>
            (newArchives: GoogleApiYouTubeSearchResource[]) => {
                const merges = [...Archives, ...newArchives];
                set(archivesAtom(channelId), merges);
            },
        [Archives]
    );

    const exists = () => {
        return Archives.length > 0;
    };

    return [Archives, lastArchivesDayTime, addArchives, exists] as const;
};
