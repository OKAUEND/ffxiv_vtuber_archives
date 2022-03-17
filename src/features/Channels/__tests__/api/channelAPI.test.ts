import axios from 'axios';
import { axiosGASInstance } from '../../api/getChannels';
import mockAdapter from 'axios-mock-adapter';
import { fetchChannels } from '../../api/getChannels';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Channel Get API TEST', () => {
    test('Axios interceptors resolve時の反応をみる', async () => {
        const mock = new mockAdapter(axiosGASInstance);

        const successResponse = {
            id: 1,
            name: 'hogefuga',
        };

        const request = {
            name: 'hogehoge',
        };

        mock.onPost('/channel').replyOnce(200, successResponse);
        const result = await fetchChannels();

        expect(result).toStrictEqual(successResponse);
    });
});
