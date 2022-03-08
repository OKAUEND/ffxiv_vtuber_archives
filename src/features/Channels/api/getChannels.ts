import { atom } from 'recoil';
import { HikasenVtuber } from '../types/index';

const ChannelsAtom = atom<HikasenVtuber[]>({
    key: 'ChannelsAtom',
    default: [],
});

export const useChannels = () => {};
