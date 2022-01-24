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
