import { Data } from '@/src/types/api';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

//State Type
type ErrorState = {
    hasError: boolean;
    status: number;
    message: string;
};

//Set Date Type
type SetErrorData = {
    status: number;
    message: string;
};

const errorAtom = atom<Error>({
    key: 'error-atom',
    default: undefined,
});

export const useError = () => {
    const [error, setError] = useRecoilState(errorAtom);
    const reset = useResetRecoilState(errorAtom);

    return [error, setError, reset] as const;
};
