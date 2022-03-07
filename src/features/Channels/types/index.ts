export type HikasenVtuber = {
    channelID: string;
    name: string;
    channelIconID: string;
    twitter: string;
    twitch: string;
    FFXIV: FFXIV;
};

type FFXIV = {
    DataCenter: string;
    Server: string;
};
