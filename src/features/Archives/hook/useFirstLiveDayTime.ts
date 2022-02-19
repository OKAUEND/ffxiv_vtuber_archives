import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

/**
 *初放送日時
 */
const firstLiveDayTimeAtom = atom<string>({
    key: 'firstLiveDayTimeAtom',
    default: '',
});

export const useFirstLiveDayTime = (firstLiveDayTime: string) => {
    const [criteriaDayTime, setFirstLiveDayTime] =
        useRecoilState(firstLiveDayTimeAtom);

    useEffect(() => {
        setFirstLiveDayTime(firstLiveDayTime);
    }, [firstLiveDayTime]);

    /**
     *FFXIV初生放送日時よりも前の日付か
     */
    const isBeforeFirstDayTime = (targetDayTime: string) => {
        return new Date(criteriaDayTime) > new Date(targetDayTime);
    };

    return [isBeforeFirstDayTime];
};
