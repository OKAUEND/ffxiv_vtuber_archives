export type HikasenVtuber = {
    channelID: string;
    name: string;
    channelIconID: string;
    channelName: string;
    twitter: string;
    twitch: string;
    ffxiv: FFXIV;
};

type FFXIV = {
    dataCenter: string;
    server: string;
};
