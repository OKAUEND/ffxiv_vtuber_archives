import { waitFor } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import { useRecoilState } from 'recoil';
import { renderRecoilHook } from '../../../../utility/test/renderRecoilHookd';
import {
    useFirstLiveDayTime,
    firstLiveDayTimeAtom,
} from '../../hook/useFirstLiveDayTime';

const testDayTime = '2020-01';

const useMock = () => {
    const [isBeforeFirstDayTime] = useFirstLiveDayTime(testDayTime);
    const [state] = useRecoilState(firstLiveDayTimeAtom);
    return { isBeforeFirstDayTime, state };
};

describe('useFirstLiveDayTime TEST', () => {
    test('初回生成時に、初回放送日の値を保持していること', async () => {
        const { result } = renderRecoilHook(useMock);

        await waitFor(() => {
            const { state } = result.current;

            expect(state).toEqual(testDayTime);
        });
    });
    test('isBeforeFirstDayTimeに初放送日以後の現在時刻を渡すと、初放送日後なので偽値が返ってくる事', async () => {
        const { result } = renderRecoilHook(useMock);

        await waitFor(() => {
            const { isBeforeFirstDayTime, state } = result.current;
            expect(state).toEqual(testDayTime);
            act(() => {
                const isEnable = isBeforeFirstDayTime('2021-01');
                expect(isEnable).toBe(false);
            });
        });
    });
    test('isBeforeFirstDayTimeに初放送日以前の現在時刻を渡すと、初放送日前なので真値が返ってくる事', async () => {
        const { result } = renderRecoilHook(useMock);

        await waitFor(() => {
            const { isBeforeFirstDayTime, state } = result.current;
            expect(state).toEqual(testDayTime);
            act(() => {
                const isEnable = isBeforeFirstDayTime('2019-01');
                expect(isEnable).toBe(true);
            });
        });
    });
});
