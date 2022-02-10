import { useEffect } from 'react';
import {
    selector,
    atom,
    useRecoilState,
    useRecoilValue,
    RecoilState,
} from 'recoil';

export type timeRangetype = {
    EndTime: string;
    BeginTime: string;
};

export const timeRangeAtom = atom<timeRangetype>({
    key: 'TimeRange',
    default: {
        EndTime: '',
        BeginTime: '',
    },
});

type useTimeRangeTuple = [timeRangetype, (targetTime: string) => void];

export const useTimeRange = () => {
    const [timeRange, setTimeRange] = useRecoilState(timeRangeAtom);

    useEffect(() => {
        const realTime = new Date().toISOString();
        saveTimeRange(realTime);
    }, []);

    const saveTimeRange = (targetTime: string) => {
        const lastArchiveTime = new Date(targetTime);
        lastArchiveTime.setMinutes(lastArchiveTime.getMinutes() - 1);
        const endTime = lastArchiveTime.toISOString();
        lastArchiveTime.setMonth(lastArchiveTime.getMonth() - 6);
        const beginTime = lastArchiveTime.toISOString();

        setTimeRange({
            EndTime: endTime,
            BeginTime: beginTime,
        });
    };

    return [timeRange, saveTimeRange] as const;
};
