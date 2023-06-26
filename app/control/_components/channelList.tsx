'use client';

import { Icon } from '@/_components/Elements/Icon';
import styles from '@/control/_styles/channelList.module.scss';
import { useAdminControl } from '@/control/(hooks)/useAdminControl';

export const ChannelList = () => {
  const [channels, selectedChannels, selectedChannel, updateDataBase] =
    useAdminControl();
  const youtubeIconURL = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ICON_URL
    ? process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ICON_URL
    : '';

  const changeStyles = (isAllMatched: boolean): string => {
    if (isAllMatched)
      return `${styles.channel_sever} ${styles.channel_hasServer}`;
    return `${styles.channel_sever}`;
  };
  return (
    <>
      {selectedChannels.length}件のチャンネルを更新予定
      <button onClick={() => updateDataBase()}>DBを更新する</button>
      <ul>
        {channels.map((channel, index) => (
          <li className={styles.channels} key={index}>
            <div className={changeStyles(channel.isAllMatched)}>
              {channel.isAllMatched ? <>◯</> : <>✕</>}
            </div>
            <div className={styles.channel_icon}>
              <Icon
                src={`${youtubeIconURL}${channel.channelIconID}`}
                alt={`${channel.name}のチャンネルアイコン`}
              />
            </div>
            <div className={styles.channel_info}>
              <h3 className={styles.title}>{channel.name}</h3>
              <span>{channel.channelName}</span>
              <span>2013/8.13</span>
            </div>
            <div className={styles.channel_action}>
              <button onClick={() => selectedChannel(channel)}>追加する</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
