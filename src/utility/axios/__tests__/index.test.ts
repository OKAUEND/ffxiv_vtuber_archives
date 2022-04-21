import React from 'react';
import mockAdapter from 'axios-mock-adapter';
import { RenderResult, renderHook, act } from '@testing-library/react-hooks';
import { AxiosInstance } from '../index';

type TESTObject = {
    id: number;
    name: string;
};

describe('AxiosInstance TEST', () => {
        const { instance, fetchPost } = AxiosInstance('application/json');
        const mock = new mockAdapter(instance);
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
        const { instance, fetchPost } = AxiosInstance('application/json');
        const mock = new mockAdapter(instance);
        mock.onPost('/test').replyOnce(408, 'ECONNABORTED');
        const result = await fetchPost<TESTObject>('/test');
        expect(result.status).toStrictEqual(408);
    });
});
