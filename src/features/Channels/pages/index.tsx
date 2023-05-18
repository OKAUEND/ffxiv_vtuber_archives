'use client';

import React from 'react';
import { ChannelPanel } from '../component/ChannelPanel';

import { useChannels } from '../hook/useChannel';
import { HikasenVtuber } from '../types';

type Props = {
  ChannelsFirstPagenation: HikasenVtuber[];
};

export const Channels = () => {
  // const [channels, resultStatus, reload] = useChannels();
  const channels = useChannels();

  console.log({ channels });

  return (
    <div className="grid grid-cols-main">
      <ChannelPanel channels={channels} />
      テスト
    </div>
  );
};
