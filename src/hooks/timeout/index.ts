import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

export type AxiosResut = {
    status: number;
    errorCode: string;
    error: boolean;
    payload: object;
};

const timeOutErrorAtom = atom<boolean>({
    key: 'timeouterror',
    default: false,
});

export const useTimeOutError = () => {
    return [];
};
