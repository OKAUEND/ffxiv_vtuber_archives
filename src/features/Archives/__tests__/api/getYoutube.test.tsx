import axios from 'axios';
import React from 'react';
import { RenderResult, renderHook, act } from '@testing-library/react-hooks';
import { RecoilRoot } from 'recoil';
import * as AxiosInstanceModule from '../../../../utility/axios/index';
import { AxiosResut } from '../../../../types/api/index';
import { waitFor } from '@testing-library/react';

describe('getYoutube Custom Hook TEST', () => {
    test('初回作成時に、APIをコールし値を取得できているか', () => {});
    test('クエリ作成関数をコールしたら、APIをコールし値を取得できるか', () => {});
});
