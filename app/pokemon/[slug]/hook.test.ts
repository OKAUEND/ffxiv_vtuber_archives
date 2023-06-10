import { describe, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTESTHook } from './hook';

const mockInit = () => {
  const dataMock = () =>
    new Promise((resolve) => {
      resolve({
        ok: true,
        status: 200,
        json: async () => ({ data: { hoge: 'hoge' } }),
      });
    });

  global.fetch = vi.fn().mockImplementation(dataMock);
};

describe('FetchをMockするテスト', () => {
  test('正常系のテスト', async () => {
    mockInit();
    const { result } = renderHook(() => useTESTHook());
    const data = await result.current;
    console.log({ data });
  });
});
