import { AxiosResut } from '../../types/api/index';

export const AxiosStatusFactory = <T>(
    status: number,
    isSuccess: boolean,
    content: T
): AxiosResut<T[]> => {
    const errorCode = () => {
        if (status === 408) {
            return 'ECONNABORTED';
        }
        return 'TEST';
    };

    return {
        status: status,
        errorCode: errorCode(),
        error: isSuccess,
        payload: [content],
    };
};
