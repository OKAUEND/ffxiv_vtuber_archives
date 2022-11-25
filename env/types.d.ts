type Env = Partial<Readonly<typeof import('./env.local.json')>>;

declare namespace NodeJS {
    interface ProcessEnv extends Env {
        readonly YOUTUBE_API?: string;
        readonly YOUTUBE_API_URL?: string;
        readonly CHANNELLIST_URL?: string;
        readonly CHANNEL_ICON_URL?: string;
    }
}
