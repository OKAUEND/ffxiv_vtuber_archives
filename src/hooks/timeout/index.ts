import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

export type AxiosResut = {
    status: number;
    errorCode: string;
    error: boolean;
    payload: object;
};
export const useTimeOutError = () => {
    return [];
};
