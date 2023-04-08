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

const errorAtom = atom<ErrorState>({
    key: 'error-atom',
    default: {
        hasError: false,
        status: 200,
        message: 'Not Message',
    },
});

export const useError = () => {
    const [error, setError] = useRecoilState(errorAtom);
    const reset = useResetRecoilState(errorAtom);

    return [error, setError, reset] as const;
};
