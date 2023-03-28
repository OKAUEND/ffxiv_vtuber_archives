import { describe, test, expect } from 'vitest';
import {} from 'msw';
import { act, renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

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
    test('初期取得で値を取得できているか', () => {});
    test('初期取得で値を取得できているか', () => {});
});
