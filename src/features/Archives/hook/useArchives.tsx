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
    () => void
];

export const useArchives = (channelId: string): useArchivesTuple => {
    const Archives = useRecoilValue(archivesSelector(channelId));
    const setArchives = useSetRecoilState(archivesAtom(channelId));

    const addArchives = (newArchives: GoogleApiYouTubeSearchResource[]) => {
        setArchives(newArchives);
    };
};
