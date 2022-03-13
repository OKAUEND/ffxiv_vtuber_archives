import axios, { AxiosAdapter } from 'axios';
import { fetchChannels } from '../../api/getChannels';
const mock = undefined as unknown as AxiosAdapter;

jest.mock('mock', () => jest.fn());

const axiosMockAdapter = mock as unknown as jest.Mock<
    ReturnType<AxiosAdapter>,
    Parameters<AxiosAdapter>
>;

describe('Channel Get API TEST', () => {
    beforeEach(() => {
        axiosMockAdapter.mockClear();
    });
    test('Axios interceptors resolve時の反応をみる', () => {
        const response = {
            status: 401,
        };

        const request = {
            name: 'hogehoge',
        };

        axiosMockAdapter.mockResolvedValueOnce(response);

        const rejectedResponse =
            axios.interceptors.response.handlers[0].rejected(response);
        expect(axiosGASInstance.interceptors.response.handlers[0]);
    });
});
