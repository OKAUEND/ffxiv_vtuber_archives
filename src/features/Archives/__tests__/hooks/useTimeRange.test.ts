import { act } from '@testing-library/react-hooks';
import { useRecoilValue } from 'recoil';
import { useTimeRange, timeRangeAtom } from '../../hook/useTimeRange';
import { renderRecoilHook } from '../../../../utility/test/renderRecoilHookd';
import { waitFor } from '@testing-library/react';

const useMock = () => {
    const [, createTimeRange] = useTimeRange();
    const state = useRecoilValue(timeRangeAtom);
    return { state, createTimeRange };
};

describe('useArchives TEST', () => {
    test('初期値として時刻が現在日時セットされている', () => {
        const { result } = renderRecoilHook(useMock);
        const { state } = result.current;

        expect(state).not.toBe({});
    });

    test('新しい時間を渡すと、重複取得防止として、1分前の時間がセットされている', async () => {
        const { result } = renderRecoilHook(useMock);

        await waitFor(() => {
            const { state, createTimeRange } = result.current;
            act(() => {
                createTimeRange(testDayTime);

                const testDate = new Date(testDayTime);
                testDate.setMinutes(testDate.getMinutes() - 1);

                expect(state.EndTime).toBe(testDate.toISOString());
            });
        });
    });
    test('新しい時間を渡すと、6ヶ月と1分前の日時がセットされている', async () => {
        const { result } = renderRecoilHook(useMock);

        await waitFor(() => {
            const { state, createTimeRange } = result.current;
            act(() => {
                createTimeRange(testDayTime);

                const testDate = new Date(testDayTime);
                testDate.setMinutes(testDate.getMinutes() - 1);
                testDate.setMonth(testDate.getMonth() - 6);

                expect(state.BeginTime).toBe(testDate.toISOString());
            });
        });
    });
});
