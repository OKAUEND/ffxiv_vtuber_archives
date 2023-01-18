import { vi, describe, test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import {} from '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';

import { setupMockServer } from '@/src/mock/test/setup';
import { handlers } from '@/src/mock/handlers';
import _fetch from 'node-fetch';

import { ArchiveRouter } from '@/src/features/Archives/pages';
import { Suspense } from 'react';
import { archiveAPIRouterHandler } from '../../mock';

const server = setupMockServer(handlers);

describe('Archives Component TEST', () => {
    function flushPromisesAndTimers(): Promise<void> {
        return act(
            () =>
                new Promise((resolve) => {
                    setTimeout(resolve, 100);
                    vi.useFakeTimers();
                    vi.runAllTimers();
                })
        );
    }

    // @ts-ignore
    global.fetch = _fetch;

    test('Hookから値から渡されたデータを子に渡し、要素が表示できているか', async () => {
        render(
            <RecoilRoot>
                <Suspense fallback={<p>Loading...</p>}>
                    <ArchiveRouter />
                </Suspense>
            </RecoilRoot>
        );
        await flushPromisesAndTimers();
        const element = screen.getAllByText('Mock');
        expect(element[0]).toBeInTheDocument();
    });
    test('初期インスタンス生成時に通信エラーが発生した時、子の要素は表示されずエラーコンポーネントが表示されるか', async () => {
        server.use(archiveAPIRouterHandler(400));
        render(
            <RecoilRoot>
                <Suspense fallback={<p>Loading...</p>}>
                    <ArchiveRouter />
                </Suspense>
            </RecoilRoot>
        );
        await flushPromisesAndTimers();
        const error = screen.getByText('400');
        expect(error).toBeInTheDocument();
    });
});

describe('Archives Component Event TEST', () => {
    test('次の取得が選ばれた時、APIより新しい値を取得し、要素へ反映できているか', async () => {});
    test(
        '次の取得が選ばれた時、エラーが発生した場合、取得済みの値を表示しつつエラー通知しているか'
    );
});