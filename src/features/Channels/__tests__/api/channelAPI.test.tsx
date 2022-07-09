import axios from 'axios';
import React from 'react';
import { vi } from 'vitest';
import { RenderResult, renderHook, act } from '@testing-library/react-hooks';
import { RecoilRoot } from 'recoil';
import { useChannels } from '../../api/getChannels';
import * as AxiosInstanceModule from '../../../../utility/axios/index';
import { HikasenVtuber } from '../../types/index';
import { AxiosStatusFactory } from '../../../../utility/test/AxiosResult';
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

describe('Channel Get API TEST', () => {
    test('リロードの関数を使用したら、取得関数がコールされるか', async () => {
        const mock = vi
            .spyOn(AxiosInstanceModule, 'get')
            .mockImplementationOnce(() => {
                return Promise.resolve(
                    AxiosStatusFactory(200, true, [
                        HikasenVtuberResourceFactory('mockTEST'),
                    ])
                );
            });

        const { result } = renderHook(() => useChannels(), {
            wrapper: RecoilRoot,
        });

        await waitFor(async () => {
            const [channels, resultStatus, loadData] = result.current;

            loadData();

            expect(mock).toHaveBeenCalledTimes(2);
        });
    });
});
