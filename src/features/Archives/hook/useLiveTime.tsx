import { selector, atom, useRecoilState, useRecoilValue } from 'recoil';
import { useArchives } from '../api/getArchives';

/**
 *初放送日時
 */
const firstLiveDayTime = atom<Date>({
    key: 'firstLiveDayTime',
    default: new Date(2012, 11, 11),
});

/**
 *FFXIV初生放送日時よりも前の日付か
 */
const isBeforeFirstLiveDayTime = selector({
    key: 'isBeforeFirstLiveDayTime',
    get: ({ get }) => {
        const firstLiveDayTimeState = get(firstLiveDayTime);
        const cacheLastArchive = get(useArchives).slice(-1)[0];
        const cacheLastDayTime = new Date(cacheLastArchive.snippet.publishedAt);
        return cacheLastDayTime >= firstLiveDayTimeState;
    },
});

export const useLiveTime = () => {
    const [firstLiveDayTimeState, setFirstLiveTime] =
        useRecoilState(firstLiveDayTime);
    const isNextLoad = useRecoilValue(isBeforeFirstLiveDayTime);
    return {
        state: firstLiveDayTimeState,
        set: setFirstLiveTime,
        isNextLoad,
    };
};
