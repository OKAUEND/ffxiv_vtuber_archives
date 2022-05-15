import {
    atomFamily,
    selectorFamily,
    useRecoilState,
    DefaultValue,
} from 'recoil';
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
    const [Archives, setArchives] = useRecoilState(archivesSelector(channelId));

    const lastArchivesDayTime = () => {
        return Archives.length === 0
            ? new Date().toISOString()
            : Archives.slice(-1)[0].snippet.publishedAt;
    };

    const update = (newArchives: GoogleApiYouTubeSearchResource[]) => {
        setArchives(newArchives);
    };

    const exists = () => {
        return Archives.length > 0;
    };

    return [Archives, lastArchivesDayTime, update, exists] as const;
};
