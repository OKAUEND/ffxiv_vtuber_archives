import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { AxiosResut } from '../../types/api/index';

const timeOutErrorAtom = atom<boolean>({
    key: 'timeouterror',
    default: false,
});

export const useTimeOutError = (target: AxiosResut<[]>) => {
    const [isTimeOut, setState] = useRecoilState(timeOutErrorAtom);
    useEffect(() => {
        if (target.errorCode == 'ECONNABORTED' && target.error) {
            setState(target.error);
        }
    }, [target.status, target.error]);
    return [isTimeOut];
};
