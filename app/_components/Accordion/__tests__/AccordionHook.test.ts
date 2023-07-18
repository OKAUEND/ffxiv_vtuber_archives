import { describe, test, vi } from 'vitest';
import { render, screen, renderHook, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useAccordion } from '../(hook)/useAccordion';
import { RecoilRoot } from 'recoil';

describe('Accordion Hook TEST', () => {
  test('Hookの初期状態で、値が文字列のクローズ状態なのを示している', () => {
    const { result } = renderHook(() => useAccordion(), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toMatch(/hidden/);
  });

  test('Changeイベントを呼び出したら、値の文字列がオープンの状態を示しているか', () => {
    const { result } = renderHook(() => useAccordion(), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toMatch(/hidden/);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).not.toMatch(/hidden/);
    expect(result.current[0]).toMatch(/open/);
  });
});
