import { useEffect } from 'react';
import {
    selector,
    atom,
    useRecoilState,
    useRecoilValue,
    RecoilState,
    useRecoilCallback,
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

export const useTimeRange = (extsisArchives = false) => {
    const [timeRange, setTimeRange] = useRecoilState(timeRangeAtom);

    useEffect(() => {
        if (extsisArchives) return;
        const realTime = new Date().toISOString();
        createTimeRange(realTime);
    }, []);

    const createTimeRange = useRecoilCallback(
        ({ set }) =>
            (targetTime: string) => {
                const lastArchiveTime = new Date(targetTime);
                lastArchiveTime.setMinutes(lastArchiveTime.getMinutes() - 1);
                const endTime = lastArchiveTime.toISOString();
                lastArchiveTime.setMonth(lastArchiveTime.getMonth() - 6);
                const beginTime = lastArchiveTime.toISOString();

                set(timeRangeAtom, { EndTime: endTime, BeginTime: beginTime });
            },
        []
    );

    return [timeRange, createTimeRange] as const;
};
