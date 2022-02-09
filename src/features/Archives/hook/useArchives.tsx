import { useEffect } from 'react';
import {
    atom,
    atomFamily,
    selector,
    selectorFamily,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';
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

type useArchivesTuple = [
    GoogleApiYouTubeSearchResource[],
    (newArchives: GoogleApiYouTubeSearchResource[]) => void,
    () => boolean
];

export const useArchives = (channelId: string) => {
    const Archives = useRecoilValue(archivesSelector(channelId));
    const setArchives = useSetRecoilState(archivesAtom(channelId));

    const addArchives = (newArchives: GoogleApiYouTubeSearchResource[]) => {
        setArchives([...Archives, ...newArchives]);
    };

    const exists = () => {
        return Archives.length > 0;
    };

    return [Archives, addArchives, exists] as const;
};
