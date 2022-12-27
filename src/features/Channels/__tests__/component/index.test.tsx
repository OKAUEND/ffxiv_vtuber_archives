import { vi, describe, test } from 'vitest';
import {} from '@testing-library/react';
import {} from '@testing-library/jest-dom';
import {} from 'recoil';

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
    test('Propsが渡され、正しくその内容が表示されているか', async () => {});

    test('Propsでエラーが渡された場合、エラー画面が表示されるか', async () => {});
});
