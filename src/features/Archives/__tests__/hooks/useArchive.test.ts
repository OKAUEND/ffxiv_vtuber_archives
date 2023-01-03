import { describe, test } from 'vitest';
import {} from 'msw';

describe('useArchive TEST', () => {
    test('CustomHooksを生成した時に、Fetchで取得した値をStateにいれタプルでHooksの外に出せているか', () => {});
    test('CustomHooksを生成した時に通信エラー発生した場合に、Errorの値があるか', () => {});
    test('次の値を取得する更新関数を呼び出した場合、値を取得し、Stateへセットできるか', () => {});
    test('次の値を取得する更新関数を呼び出した場合、通信エラー発生した場合に、Errorの値があるか', () => {});
    test('次の値を取得する更新関数を呼び出した場合、通信エラー発生した場合で、キャッシュがある場合でもErrorの値があるか', () => {});
});
