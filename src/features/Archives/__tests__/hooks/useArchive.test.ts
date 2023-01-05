import { describe, test, expect } from 'vitest';
import {} from 'msw';
import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { useArchives } from '@/src/features/Archives/hook/useArchive';
import { setupMockServer } from '@/src/mock/test/setup';
import { handlers } from '@/src/mock/handlers';

import { GoogleYoutubeFactory } from '@/src/features/Archives/mock';

const server = setupMockServer(handlers);

describe('useArchive TEST', () => {
    const mockYoutubeData = GoogleYoutubeFactory();
    test('CustomHooksを生成した時に、Fetchで取得した値をStateにいれタプルでHooksの外に出せているか', async () => {
        const { result } = renderHook(() => useArchives('mock'), {
            wrapper: RecoilRoot,
        });

        await waitFor(() => {
            expect(result.current[0]).toStrictEqual([mockYoutubeData]);
        });
    });
    test('CustomHooksを生成した時に通信エラー発生した場合に、Errorの値があるか', () => {});
    test('次の値を取得する更新関数を呼び出した場合、値を取得し、Stateへセットできるか', () => {});
    test('次の値を取得する更新関数を呼び出した場合、通信エラー発生した場合に、Errorの値があるか', () => {});
    test('次の値を取得する更新関数を呼び出した場合、通信エラー発生した場合で、キャッシュがある場合でもErrorの値があるか', () => {});
});
