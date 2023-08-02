export interface HikasenVtuber {
  channelID: string;
  name: string;
  channelName: string;
  channelIconURL: string;
  isOfficial: boolean;
  Twitter: string;
  Twitch: string;
  dataCenter: string;
  server: string;
  beginTime: string | Date;
  tags: { content: Tag[]; party: Tag[]; timezone: Tag[] };
}

export interface Tag {
  id: number;
  name: string;
  code: string;
}
