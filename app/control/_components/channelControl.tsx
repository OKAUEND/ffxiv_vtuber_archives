import styles from '@/control/_styles/channelList.module.scss';
import { ChannelList } from '@/control/_components/channelList';

export const ChannelControl = () => {
  return (
    <section className={styles.container}>
      <h2>配信者一覧</h2>
      <ChannelList />
    </section>
  );
};
