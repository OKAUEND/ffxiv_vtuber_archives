import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

const run = (client: AxiosInstance) => {
    const mock = new MockAdapter(client);
    mock.onGet().reply(200);
};
