import { vi, describe, test, expect, vitest, Vitest } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import {} from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';

import { setupMockServer } from '@/src/mock/test/setup';
import { handlers } from '@/src/mock/handlers';
import _fetch from 'node-fetch';

import { ArchiveRouter } from '@/src/features/Archives/pages';
import * as useArchiveMock from '@/src/features/Archives/hook/useArchive';
import { Suspense } from 'react';
import { archiveAPIRouterHandler, GoogleYoutubeFactory } from '../../mock';
import { Data } from '@/src/types/api';

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

    afterAll(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    test('Hookから値から渡されたデータを子に渡し、要素が表示できているか', async () => {
        render(
            <RecoilRoot>
                <ArchiveRouter />
            </RecoilRoot>
        );
        await flushPromisesAndTimers();
        const element = screen.getAllByRole('listitem');
        expect(element).toHaveLength(25);
    });
    test('初期インスタンス生成時に通信エラーが発生した時、子の要素は表示されずエラーコンポーネントが表示されるか', async () => {
        // server.use(archiveAPIRouterHandler(400));
        // render(
        //     <RecoilRoot>
        //         <Suspense fallback={<p>Loading...</p>}>
        //             <ArchiveRouter />
        //         </Suspense>
        //     </RecoilRoot>
        // );
        // await flushPromisesAndTimers();
        // const error = screen.getByText('400');
        // expect(error).toBeInTheDocument();
    });
    test('次を取得ボタンをクリックした時、関数を呼び出せているか', async () => {
        const mockFn = vi.fn();
        //タイマー関数を使わずにテストを行うために、関数をMockさせてテストする
        const spy = vi.spyOn(useArchiveMock, 'usePage');
        spy.mockImplementation(() => mockFn);
        const user = userEvent.setup({ delay: null });

        render(
            <RecoilRoot>
                <ArchiveRouter />
            </RecoilRoot>
        );

        const buttonElement = screen.getByRole('button', { name: 'Next' });
        expect(buttonElement).toBeInTheDocument();

        expect(mockFn).toHaveBeenCalledTimes(0);

        await user.click(buttonElement);

        expect(mockFn).toHaveBeenCalledTimes(1);
    });
    test('次の取得が選ばれた時、エラーが発生した場合、取得済みの値を表示しつつエラー通知しているか', async () => {
        const user = userEvent.setup();

        render(
            <RecoilRoot>
                <Suspense fallback={<p>Loading...</p>}>
                    <ArchiveRouter />
                </Suspense>
            </RecoilRoot>
        );
        const element = screen.getByText('Error');
        expect(element).toBeInTheDocument();
    });
});
