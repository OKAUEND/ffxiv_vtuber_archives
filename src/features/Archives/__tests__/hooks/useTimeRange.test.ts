import { act } from '@testing-library/react-hooks';
import { useRecoilValue } from 'recoil';
import { useTimeRange, timeRangeAtom } from '../../hook/useTimeRange';
import { renderRecoilHook } from '../../../../utility/test/renderRecoilHookd';

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

    test('新しい時間を渡すと、重複取得防止として、1分前の時間がセットされている', () => {
        const { result } = renderRecoilHook(useMock);
        const { state, createTimeRange } = result.current;

        const testDayTime = '20200101';

        act(() => {
            createTimeRange(testDayTime);
        });

        const testDate = new Date(testDayTime);
        testDate.setMinutes(testDate.getMinutes() - 1);

        expect(state.EndTime).toBe(testDate.toISOString());
    });
    test('新しい時間を渡すと、6ヶ月前の日時がセットされている', () => {
        const { result } = renderRecoilHook(useMock);
        const { state, createTimeRange } = result.current;

        const testDayTime = '20200101';

        act(() => {
            createTimeRange(testDayTime);
        });

        const testDate = new Date(testDayTime);
        testDate.setMinutes(testDate.getMonth() - 6);

        expect(state.EndTime).toBe(testDate.toISOString());
    });
});
