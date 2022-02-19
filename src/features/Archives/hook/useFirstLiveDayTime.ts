import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

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

    const isBeforeFirstDayTime = (targetDayTime: string) => {
        return new Date(criteriaDayTime) > new Date(targetDayTime);
    };

    return [isBeforeFirstDayTime];
};
