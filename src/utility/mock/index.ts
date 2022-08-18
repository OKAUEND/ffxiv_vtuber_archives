import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

const run = (client: AxiosInstance, url: string) => {
    const mock = new MockAdapter(client);
    mock.onGet(url).reply(200, [GoogleYoutubeFactory('')]);
};

export { run };
