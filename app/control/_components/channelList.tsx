'use client';

import { Icon } from '@/_components/Elements/Icon';
import styles from '@/control/_styles/channelList.module.scss';
import { useAdminControl } from '@/control/(hooks)/useAdminControl';

export const ChannelList = () => {
  const channels = useAdminControl();
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
            <Icon src={channel.channelIconID} alt="仮実装" />
          </div>
          <div className={styles.channel_info}>
            <h3 className={styles.title}>{channel.name}</h3>
            <span>{channel.channelName}</span>
            <span>2013/8.13</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
