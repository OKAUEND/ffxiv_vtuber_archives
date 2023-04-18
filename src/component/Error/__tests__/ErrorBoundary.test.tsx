import React, { Suspense } from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';

describe('ErrorBoundary Component Unit TEST', () => {
    const ChildComponent = () => <div>ChildComponent</div>;
    const ErrorComponent = () => {
        throw { hasError: true, message: 'TEST ERROR', status: 404 };
    };

    //エラー
    const FallBackComponent = (status: number) => {
        return <div>{status}</div>;
    };

    //オリジナルを一旦退避させる
    const originalConsoleError = console.error;

    beforeEach(() => {
        //必ず出力されるConcole.errorがあり、出力画面を汚してしまうのでMockで置き換えて出さないようにする
        console.error = vi.fn();
    });

    afterEach(() => {
        console.error = originalConsoleError; // テスト後に元のconsole.errorに戻す
    });

    it('レンダーエラー', () => {
        const wrapper = render(
            <ErrorBoundary fallback={FallBackComponent}>
                <Suspense>
                    <ChildComponent />
                </Suspense>
            </ErrorBoundary>
        );

        expect(screen.getByText('ChildComponent')).toBeInTheDocument();
    });

    it('catches and displays error message', () => {
        render(
            <ErrorBoundary fallback={FallBackComponent}>
                <Suspense>
                    <ErrorComponent />
                </Suspense>
            </ErrorBoundary>
        );

        expect(screen.getByText('404')).toBeInTheDocument();
    });
});
