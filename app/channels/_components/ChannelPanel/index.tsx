import Link from 'next/link';

import styles from '@/channels/_style/channelPanel/channelPanel.module.scss';
import { Icon } from '@/_components/Elements/Icon';
import { HikasenVtuber } from '@/(types)';
import DayTime from '@/_utile/convert/DayTime';

type Props = {
  channels: HikasenVtuber[];
};

export const ChannelPanel = ({ channels }: Props) => {
  const youtubeIconURL = process.env.YOUTUBE_CHANNEL_ICON_URL;
  return (
    <ul className={styles.container}>
      {channels.map((channel) => (
        <li key={channel.channelID} className={styles.channel_list}>
          <div className={styles.channel_content}>
            <Link
              href={`https://www.youtube.com/channel/${channel.channelID}`}
              target="_blank"
            >
              <div className={styles.channel_icon}>
                <Icon
                  src={`${youtubeIconURL}${channel.channelIconURL}`}
                  alt={`${channel.name}のチャンネルアイコン`}
                />
              </div>
            </Link>
            <div className={styles.channel_info}>
              <div className={styles.info_title}>
                <span className={styles.info_text}>{channel.name}</span>
                <span className={styles.info_channelName}>
                  {channel.channelName}
                </span>
              </div>

              <span className={styles.channel_since}>
                {DayTime(channel.beginTime)}
              </span>
            </div>
            <div className={styles.channel_tag}>
              <div className={styles.playstyle}>
                <div className={styles.tag}>メインストーリー</div>
                <div className={styles.tag}>極</div>
                <div className={styles.tag}>零式</div>
                <div className={styles.tag}>ハウジング</div>
                <div className={styles.tag}>地図</div>
                <div className={styles.tag}>世界設定</div>
                <div className={styles.tag}>PvP</div>
              </div>
              <div className={styles.playstyle}>
                <div className={styles.tag}>参加型</div>
                <div className={styles.tag}>ソロ</div>
                <div className={styles.tag}>NPC芸</div>
              </div>
              <div className={styles.playstyle}>
                <div className={styles.tag}>早朝</div>
                <div className={styles.tag}>朝</div>
                <div className={styles.tag}>昼</div>
                <div className={styles.tag}>夕方</div>
                <div className={styles.tag}>夜</div>
                <div className={styles.tag}>深夜</div>
              </div>
              <div className={styles.playstyle}>Mana Chocobo</div>
              <div className={styles.info_link}>詳しくみる→</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
