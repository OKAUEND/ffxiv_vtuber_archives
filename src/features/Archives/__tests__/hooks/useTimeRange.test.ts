import { RenderResult, renderHook, act } from '@testing-library/react-hooks';
import { useTimeRange } from '../../hook/useTimeRange';

describe('useArchives TEST', () => {
    test('初期値として時刻が現在日時セットされている', () => {
        const { result } = renderHook(() => useTimeRange());
        const [timeRange] = result.current;

        expect(timeRange).toBe(true);
    });

    test('新しい時間を渡すと、重複取得防止として、1分前の時間がセットされている', () => {});
    test('新しい時間を渡すと、6ヶ月前の日時がセットされている', () => {});
});
