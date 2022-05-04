import { RenderResult, renderHook, act } from '@testing-library/react-hooks';
import { renderRecoilHook } from '../../../../utility/test/renderRecoilHookd';
import {
    useFirstLiveDayTime,
    firstLiveDayTimeAtom,
} from '../../hook/useFirstLiveDayTime';

describe('useFirstLiveDayTime TEST', () => {
    test('初回生成時に、初回放送日の値を保持していること');
    test(
        'isBeforeFirstDayTimeに初放送日以後の現在時刻を渡すと、初放送日後なので偽値が返ってくる事'
    );
    test(
        'isBeforeFirstDayTimeに初放送日以前の現在時刻を渡すと、初放送日前なので真値が返ってくる事'
    );
});
