type Env = Partial<Readonly<typeof import('./env.local.json')>>;

declare namespace NodeJS {
    interface ProcessEnv extends Env {
        readonly YOUTUBE_API?: string;
        readonly CHANNELLIST_URL?: string;
    }
}
