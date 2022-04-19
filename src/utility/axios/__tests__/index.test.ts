import React from 'react';
import mockAdapter from 'axios-mock-adapter';
import { RenderResult, renderHook, act } from '@testing-library/react-hooks';
import { axiosInstance, fetchPost } from '../index';

type TESTObject = {
    id: number;
    name: string;
};

describe('AxiosInstance TEST', () => {
    test('Axios interceptors resolve時の反応をみる', async () => {
        const mock = new mockAdapter(axiosInstance);
        const successResponse: TESTObject = {
            id: 1,
            name: 'hogefuga',
        };
        const request = {
            name: 'hogehoge',
        };
        mock.onPost('/test').replyOnce(200, successResponse);
        const result = await fetchPost<TESTObject>('/test');
        expect(result.payload).toStrictEqual(successResponse);
    });
    test('Axios interceptors reject時の反応をみる', async () => {
        const mock = new mockAdapter(axiosInstance);
        mock.onPost('/test').replyOnce(408, 'ECONNABORTED');
        const result = await fetchPost<TESTObject>('/test');
        expect(result.status).toStrictEqual(408);
    });
});
