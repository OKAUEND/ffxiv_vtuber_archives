import { vi, describe, test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import {} from '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';

import Home from '../../../../../pages/index';
import { HikasenVtuberResourceFactory } from '@/src/features/Channels/mock';
import { Data } from '@/src/types/api';
import { HikasenVtuber } from '../../types';

describe('Channel Component TEST', () => {
    const List = HikasenVtuberResourceFactory('ComponentTEST');
    type Props = Data<HikasenVtuber>;

    const Data: Props = {
        status: 200,
        message: 'Success!',
        item: [List],
    };
    const Error: Props = {
        status: 400,
        message: 'Bad Request',
        error: true,
    };
    test('Propsが渡され、正しくその内容が表示されているか', async () => {
        render(
            <RecoilRoot>
                <Home {...Data} />
            </RecoilRoot>
        );
        await waitFor(() => {
            expect(screen.getByText('ComponentTEST')).toBeInTheDocument();
        });
    });
    test('Propsでエラーが渡された場合、エラー画面が表示されるか', async () => {
        render(
            <RecoilRoot>
                <Home {...Error} />
            </RecoilRoot>
        );
        await waitFor(() => {
            expect(screen.getByText('400')).toBeInTheDocument();
        });
    });
});
