import { Data } from '@/src/types/api';
import { atom } from 'recoil';

type Error = Omit<Data<[]>, 'item'>;

const errorAtom = atom<Error>({
    key: 'error-atom',
    default: undefined,
});

export const useError = () => {};
