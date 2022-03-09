import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { HikasenVtuber } from '../types/index';

const ChannelsAtom = atom<HikasenVtuber[]>({
    key: 'ChannelsAtom',
    default: [],
});

export const useChannels = () => {};
