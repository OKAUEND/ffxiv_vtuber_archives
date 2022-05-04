import { RenderResult, renderHook, act } from '@testing-library/react-hooks';
import { renderRecoilHook } from '../../../../utility/test/renderRecoilHookd';
import {
    useFirstLiveDayTime,
    firstLiveDayTimeAtom,
} from '../../hook/useFirstLiveDayTime';
