export type Archives = Pick<
    GoogleApiYouTubePageInfo<GoogleApiYouTubeSearchResource>,
    'items'
>;

export type timeRangetype = {
    EndTime: string;
    BeginTime: string;
};
