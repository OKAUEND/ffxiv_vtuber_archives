import axios from 'axios';
import { axiosGASInstance } from '../../api/getChannels';
import mockAdapter from 'axios-mock-adapter';
import { fetchChannels } from '../../api/getChannels';

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

    test('Axios interceptors reject時の反応をみる', async () => {
        const mock = new mockAdapter(axiosGASInstance);

        mock.onPost('/channel').replyOnce(400, 'error');
        const result = await fetchChannels();

        expect(result).toStrictEqual('error');
    });
});
