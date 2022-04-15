import axios from 'axios';
import React from 'react';
import { RenderResult, renderHook, act } from '@testing-library/react-hooks';

describe('AxiosInstance TEST', () => {
    test('Axios interceptors resolve時の反応をみる', async () => {
        const mock = new mockAdapter(axiosGASInstance);
        const successResponse = {
            id: 1,
            name: 'hogefuga',
        };
        const request = {
            name: 'hogehoge',
        };
        mock.onPost('/channel').replyOnce(200, successResponse);
        const result = await fetchChannels();
        expect(result).toStrictEqual(successResponse);
    });
    test('Axios interceptors reject時の反応をみる', async () => {
        const mock = new mockAdapter(axiosGASInstance);
        mock.onPost('/channel').replyOnce(408, 'ECONNABORTED');
        const result = await fetchChannels();
        expect(result.status).toStrictEqual(408);
    });
});
