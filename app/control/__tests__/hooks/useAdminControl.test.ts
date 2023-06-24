import { describe, test, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

describe('useAdminControl Unit TEST', () => {
  test('値が取れているか', () => {});
  test('DB側に値がない場合は、一致しているかのフラグが偽になっているか', () => {});
  test('DB側に値があった場合は、全要素が一致していればフラグが真になっているか', () => {});
  test('DB側に値があった場合は、一部要素が違っていればフラグが偽になっているか', () => {});
});
