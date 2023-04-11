import {} from '../index';
import { vi, describe, test, expect } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import {} from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';

import * as useError from '@/src/hooks/error/useError';

import { ErrorNotification } from '../index';

describe('ErrorNotification Unit TEST', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });
    test('エラー状態出ない場合はエラー画面が表示されていないか', () => {
        const mock = vi.fn(() => {});
        render(
            <RecoilRoot>
                <ErrorNotification handleReloadData={mock} />
            </RecoilRoot>
        );
        expect(screen.queryByText(/\d/)).not.toBeInTheDocument();
        expect(
            screen.queryByText(
                /エラーが発生しました。以下のリロードを選択し再度処理をやり直すか、一つ前の画面へ戻るかを選択してください。/
            )
        ).not.toBeInTheDocument();
    });
    test('エラー発生時は、エラー画面を表示しているか', () => {
        const MockFn = vi.fn(() => {});
        const errorMessage = 'Mock Error';
        const errorStatus = 500;
        const spy = vi.spyOn(useError, 'useError');
        spy.mockImplementationOnce(() => [
            { status: errorStatus, message: errorMessage, hasError: true },
            MockFn,
            MockFn,
        ]);
        render(<ErrorNotification handleReloadData={MockFn} />);
        expect(screen.queryByText(`${errorStatus}`)).toBeInTheDocument();
        expect(screen.queryByText(errorMessage)).toBeInTheDocument();
        expect(screen.getByText('リロード')).toBeInTheDocument();
        expect(screen.getByText('トップページに戻る')).toBeInTheDocument();
    });
    test('「リロード」時に、コールバックを呼び出し、エラー状態をリセットする', async () => {
        const MockFn = vi.fn(() => {});
        const MockBackTop = vi.fn(() => {});
        const errorMessage = 'Mock Error';
        const errorStatus = 500;
        const spy = vi.spyOn(useError, 'useError');
        spy.mockImplementation(() => [
            { status: errorStatus, message: errorMessage, hasError: true },
            () => {},
            MockFn,
        ]);
        render(<ErrorNotification handleReloadData={() => {}} />);

        const user = userEvent.setup({ delay: null });
        const button = screen.getByText('リロード');

        expect(MockFn).toHaveBeenCalledTimes(0);

        await user.click(button);

        expect(MockFn).toHaveBeenCalledTimes(1);
        expect(MockBackTop).toHaveBeenCalledTimes(0);
    });
    test('ボタンをクリックしたときにトップページに移動する場合に関数を呼び出せているか', async () => {
        const MockFn = vi.fn(() => {});
        const MockBackTop = vi.fn(() => {});
        const errorMessage = 'Mock Error';
        const errorStatus = 500;
        const spy = vi.spyOn(useError, 'useError');
        spy.mockImplementation(() => [
            { status: errorStatus, message: errorMessage, hasError: true },
            () => {},
            MockFn,
        ]);
        render(<ErrorNotification handleReloadData={MockBackTop} />);

        const user = userEvent.setup({ delay: null });
        const button = screen.getByText('トップページに戻る');

        expect(MockFn).toHaveBeenCalledTimes(0);

        await user.click(button);

        expect(MockFn).toHaveBeenCalledTimes(1);
    });
});
