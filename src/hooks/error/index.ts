import { Data } from '@/src/types/api';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

type Error = Omit<Data<[]>, 'item'>;

const errorAtom = atom<Error>({
    key: 'error-atom',
    default: undefined,
});

export const useError = () => {
    const [error, setError] = useRecoilState(errorAtom);
    const reset = useResetRecoilState(errorAtom);

    return [error, setError, reset];
};
