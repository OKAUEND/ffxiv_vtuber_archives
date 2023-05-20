export type Error = {
  hasError: boolean;
  status: number;
  message: string;
};

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
