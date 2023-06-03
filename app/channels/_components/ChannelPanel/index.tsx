import Link from 'next/link';

import styles from '@/channels/_style/channelPanel/channelPanel.module.scss';
import { Icon } from '@/_components/Elements/Icon';
import { HikasenVtuber } from '@/src/features/Channels/types';

type Props = {
  channels: HikasenVtuber[];
};

export const ChannelPanel = ({ channels }: Props) => {
  return (
    <ul className={styles.container}>
      {channels.map((channel) => (
        <li key={channel.channelID} className={styles.channel_list}>
          <div className={styles.channel_content}>
            <div className="row-span-3">
              <Link href={`/archives/${channel.channelID}`}>
                <Icon
                  src={channel.channelIconID}
                  alt={`${channel.name}のチャンネルアイコン`}
                />
              </Link>
            </div>
            <div className="row-span-1 col-span-2 mt-4 flex flex-col inline-block justify-center items-center \">
              <Link href={`/archives/${channel.channelID}`}>
                <div className="flex flex-col">
                  <span className="text-gray-100 font-sans text-lg">
                    {channel.name}
                  </span>
                  <span className="text-gray-400 font-sans text-sm">
                    Channel Name
                  </span>
                </div>
              </Link>
              <span className="text-gray-400 font-sans text-xs">
                Since 2013/8/24
              </span>
            </div>
            <div className="row-span-2 col-span-2">TAGTAGTAGTAGATGA</div>
          </div>
        </li>
      ))}
    </ul>
  );
};
