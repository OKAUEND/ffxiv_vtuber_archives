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

const useArchives = (channelId: string): GoogleApiYouTubeSearchResource[] => {
    return useRecoilValue(archivesSelector(channelId));
};
