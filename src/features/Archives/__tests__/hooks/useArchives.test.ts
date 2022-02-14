import { RenderResult, renderHook, act } from '@testing-library/react-hooks';
import { useArchives } from '../../hook/useArchives';

describe('useArchives TEST', () => {
    test('初期値の何も格納がされていない配列であること', () => {
        const { result } = renderHook(() => useArchives('testChannel'));
        const [target] = result.current;
        expect(target).toEqual([]);
    });
});
