import { describe, test, expect } from 'vitest';
import {} from 'msw';
import { act, renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, snapshot_UNSTABLE } from 'recoil';

import {
    useArchives,
    usePage,
    totalItems,
    pageSize,
} from '@/src/features/Archives/hook/useArchive';
import { setupMockServer } from '@/src/mock/test/setup';
import { handlers } from '@/src/mock/handlers';

import {
    archiveAPIRouterHandler,
    GoogleYoutubeFactory,
} from '@/src/features/Archives/mock';

const server = setupMockServer(handlers);

describe('useArchive TEST', () => {
    const mockYoutubeData = GoogleYoutubeFactory();
    test('初期取得で値を取得できているか', async () => {
        const { result } = renderHook(() => useArchives('Mock'), {
            wrapper: RecoilRoot,
        });
        await waitFor(() => {
            expect(result.current[0].archives).toStrictEqual(
                mockYoutubeData.items
            );
        });
    });
    test('エラー発生時の対応(- エラー発生時の動作がまだ未定なので仮に項目作成)', () => {});
});

describe('usePage TEST', () => {
    test('初期値は事前に設定している値になっているか', async () => {
        const initialSnapshot = snapshot_UNSTABLE();
        initialSnapshot.getLoadable(totalItems('Mock'));
    });
    test('更新関数を呼び出した時、値がインクリメントされているか', () => {
        const initialSnapshot = snapshot_UNSTABLE();
        expect(initialSnapshot.getLoadable(totalItems('Mock'))).toEqual(
            pageSize
        );

        const { result } = renderHook(() => usePage(), { wrapper: RecoilRoot });

        result.current[0]('Mock');

        expect(initialSnapshot.getLoadable(totalItems('Mock'))).toEqual(
            pageSize + pageSize
        );
    });
});
