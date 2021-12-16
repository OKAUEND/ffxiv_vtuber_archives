import { selector, atom, useRecoilState, useRecoilValue } from 'recoil';
/**
 *初放送日時
 */
const firstLiveDayTime = atom<Date>({
    key: 'firstLiveDayTime',
    default: new Date(2012, 11, 11),
});

