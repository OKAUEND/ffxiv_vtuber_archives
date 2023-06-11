import { describe, test, expect } from 'vitest';
import {} from 'msw';
import { act, renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, snapshot_UNSTABLE } from 'recoil';

import { useArchives } from '@/archives/(hooks)/useArchives';
import { createFetchMock } from '@/_mock/fetch';
import { YoutubeResourceFactory } from '@/archives/__tests__/hooks/mock';

describe('useArchive TEST', () => {
  const mockYoutubeData = YoutubeResourceFactory();
  test('初期取得で値を取得できているか', async () => {
    const { result } = renderHook(() => useArchives('Mock'), {
      wrapper: RecoilRoot,
    });
    await waitFor(() => {
      expect(result.current.archives.archives.length > 0).toEqual(true);
    });
  });
  test('放送タイトルがFF14に関係ないものだった場合、配列から除外できているか', async () => {
    const { result } = renderHook(() => useArchives('Mock'), {
      wrapper: RecoilRoot,
    });
    await waitFor(() => {
      const reg = new RegExp(`FF14|FFXIV`);
      result.current.archives.archives.forEach((archive) => {
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
      expect(archiveResult.result.current.archives.archives.length).toEqual(40);
    });
  });
  test('エラー発生時は、エラーがthrowされているか', () => {
    expect(useArchives('Mock')).rejects.toThrowError();
  });
});
