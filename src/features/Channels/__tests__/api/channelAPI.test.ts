import axios from 'axios';
import { axiosGASInstance } from '../../api/getChannels';
import mockAdapter from 'axios-mock-adapter';
import { fetchChannels } from '../../api/getChannels';

jest.mock('axios');
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
