export type Archives = Pick<
    GoogleApiYouTubePageInfo<GoogleApiYouTubeSearchResource>,
    'items'
>;

export type timeRangetype = {
    EndTime: string;
    BeginTime: string;
};

export type VtuberDetail = {
    name: string;
    channelIconID: string;
    channelName: string;
    twitter: string;
    twitch: string;
};
