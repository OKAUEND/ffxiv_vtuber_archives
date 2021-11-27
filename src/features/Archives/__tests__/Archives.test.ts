import { getArchives, setArchives, isPeriod } from '../api/getArchives';

describe('Archives TEST', () => {
    test('対象の時間が基準の時間より大きい場合は真を返す', () => {
        const targetTime = new Date(2021, 12, 3);
        const BeginTime = new Date(2021, 12, 7);
        const result = isPeriod(targetTime, BeginTime);
        expect(result).toEqual(true);
    });
});
