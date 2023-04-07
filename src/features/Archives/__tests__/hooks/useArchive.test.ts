import { describe, test, expect } from 'vitest';
import {} from 'msw';
import { act, renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, snapshot_UNSTABLE } from 'recoil';

import { useArchives } from '@/src/features/Archives/hook/useArchive';
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
            expect(result.current.archives.length > 0).toEqual(true);
        });
    });
    test('放送タイトルがFF14に関係ないものだった場合、配列から除外できているか', async () => {
        const { result } = renderHook(() => useArchives('Mock'), {
            wrapper: RecoilRoot,
        });
        await waitFor(() => {
            const reg = new RegExp(`FF14|FFXIV`);
            result.current.archives.forEach((archive) => {
                expect(reg.test(archive.snippet.title)).toEqual(true);
            });
        });
    });
    test('更新をした時件数が増えているか', async () => {
        const archiveResult = renderHook(() => useArchives('Mock'), {
            wrapper: RecoilRoot,
        });

        await act(() => {
            archiveResult.result.current.loadNextList('Mock');
        });

        await waitFor(() => {
            expect(archiveResult.result.current.archives.length).toEqual(40);
        });
    });
    test('取得件数を減らす。減らした場合、取得件数がへっていることで確認', async () => {
        const archiveResult = renderHook(() => useArchives('Mock'), {
            wrapper: RecoilRoot,
        });

        await act(() => {
            archiveResult.result.current.loadNextList('Mock');
        });

        await waitFor(() => {
            expect(archiveResult.result.current.archives.length).toEqual(40);
        });

        await act(() => {
            archiveResult.result.current.decrementPageSize('Mock');
        });

        await waitFor(() => {
            expect(archiveResult.result.current.archives.length).toEqual(20);
        });
    });
    test('エラー発生時の対応(- エラー発生時の動作がまだ未定なので仮に項目作成)', () => {});
});
