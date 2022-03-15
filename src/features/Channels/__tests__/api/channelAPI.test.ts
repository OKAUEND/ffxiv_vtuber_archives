import axios, { AxiosAdapter } from 'axios';
import { fetchChannels } from '../../api/getChannels';

const mockAPI = jest.fn().mockName('mock-api');
jest.mock('axios', () => ({
    __esModule: true,
    default: {
        create: jest.fn(() => {
            return {
                interceptors: {
                    request: { use: jest.fn() },
                    response: { use: jest.fn() },
                },
                post: mockAPI,
            };
        }),
    },
}));
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Channel Get API TEST', () => {
    test('Axios interceptors resolve時の反応をみる', async () => {
        const successResponse = {
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
            data: {
                id: 1,
                name: 'hogefuga',
            },
        };

        const request = {
            name: 'hogehoge',
        };

        mockAxios.post.mockResolvedValue(successResponse);

        const result = await fetchChannels();

        expect(result).toStrictEqual(successResponse.data);
    });
});
