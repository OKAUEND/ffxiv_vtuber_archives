import { atom, useRecoilCallback, useRecoilValue } from 'recoil';

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

export const errorState: ErrorState = {
    hasError: false,
    status: 200,
    message: 'Not Message',
};

const errorAtom = atom<ErrorState>({
    key: 'error-atom',
    default: errorState,
});

export const useError = () => {
    const error = useRecoilValue(errorAtom);
    const setError = useRecoilCallback(({ set }) => (error: SetErrorData) => {
        set(errorAtom, error);
    });

    const reset = useRecoilCallback(({ reset }) => () => {
        reset(errorAtom);
    });

    return [error, setError, reset] as const;
};
