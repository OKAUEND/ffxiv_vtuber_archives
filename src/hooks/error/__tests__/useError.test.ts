import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useError, errorState, SetErrorData } from '../useError';

describe('useError', () => {
    it('useErrorの戻値で、それぞれError状態、関数、関数のタプルになっているか', () => {
        const { result } = renderHook(() => useError(), {
            wrapper: RecoilRoot,
        });

        expect(result.current).toHaveLength(3);
        expect(result.current[0]).toEqual(errorState);
        expect(typeof result.current[1]).toEqual('function');
        expect(typeof result.current[2]).toEqual('function');
    });

    it('エラー状態をセットできるか', () => {
        const { result } = renderHook(() => useError(), {
            wrapper: RecoilRoot,
        });

        expect(result.current[0].hasError).toEqual(false);

        const mockError: SetErrorData = { status: 404, message: 'Not Found' };

        act(() => {
            result.current[1](mockError);
        });

        expect(result.current[0]).toEqual(mockError);
    });

    it('エラー状態をリセットできるか', () => {
        const { result } = renderHook(() => useError(), {
            wrapper: RecoilRoot,
        });

        expect(result.current[0].hasError).toEqual(false);

        const mockError: SetErrorData = { status: 404, message: 'Not Found' };

        act(() => {
            result.current[1](mockError);
        });

        expect(result.current[0]).toEqual(mockError);

        act(() => {
            result.current[2]();
        });

        expect(result.current[0]).toEqual(errorState);
    });
});
