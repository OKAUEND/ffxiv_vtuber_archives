'use client';

import { Icon } from '@/_components/Elements/Icon';
import styles from '@/control/_styles/channelList.module.scss';
import { useAdminControl } from '@/control/(hooks)/useAdminControl';

export const ChannelList = () => {
  const channels = useAdminControl();
  const youtubeIconURL = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ICON_URL;
  return (
    <ul>
      {channels.map((channel, index) => (
        <li className={styles.channels} key={index}>
          <div
            className={`${styles.channel_sever} ${styles.channel_hasServer}`}
          >
            ◯
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
          <div className={styles.channel_action}></div>
        </li>
      ))}
    </ul>
  );
};
