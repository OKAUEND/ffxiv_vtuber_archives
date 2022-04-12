import axios from 'axios';
import React from 'react';
import { RenderResult, renderHook, act } from '@testing-library/react-hooks';
import { RecoilRoot } from 'recoil';
import { axiosGASInstance } from '../../api/getChannels';
import mockAdapter from 'axios-mock-adapter';
import { useChannels, fetchChannels } from '../../api/getChannels';
import * as fetchChannelModule from '../../api/getChannels';

import { HikasenVtuber } from '../../types/index';
import { AxiosResut } from '../../../../types/api/index';
import { waitFor } from '@testing-library/react';

const HikasenVtuberResourceFactory = (name: string): HikasenVtuber => {
    return {
        channelID: name,
        channelIconID: name,
        name: name,
        twitter: '',
        twitch: '',
        ffxiv: {
            dataCenter: 'test',
            server: 'test',
        },
    };
};

const AxiosStatusFactory = (
    status: number,
    isSuccess: boolean,
    HikasenVtuber: HikasenVtuber[]
): AxiosResut<HikasenVtuber[]> => {
    const errorCode = () => {
        if (status === 408) {
            return 'ECONNABORTED';
        }
        return 'TEST';
    };

    return {
        status: status,
        errorCode: errorCode(),
        error: isSuccess,
        payload: HikasenVtuber,
    };
};

describe('Channel Get API TEST', () => {
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
        mock.onPost('/channel').replyOnce(408, 'error');
        const result = await fetchChannels();
        expect(result).toStrictEqual('error');
    });

    test('リロードの関数を使用したら、取得関数がコールされるか', async () => {

        const mock = jest
            .spyOn(getChannelsModule, 'fetchChannels')
            .mockImplementationOnce(() =>
                Promise.resolve(
                    AxiosStatusFactory(200, true, [
                        HikasenVtuberResourceFactory('mockTEST'),
                    ])
                )
            );

        const { result } = renderHook(() => useChannels(), {
            wrapper: RecoilRoot,
        });

        await waitFor(async () => {
            const [channels, resultStatus, loadData] = result.current;

            loadData();

            expect(mock).toHaveBeenCalledTimes(1);
        });
    });
});
