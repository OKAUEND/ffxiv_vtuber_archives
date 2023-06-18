import { Icon } from '@/_components/Elements/Icon';
import styles from '@/control/_styles/channelList.module.scss';

export const ChannelList = () => {
  return (
    <section className={styles.container}>
      <h2>配信者一覧</h2>
      <div className={styles.channels}>
        <div className={styles.channel_sever}>◯</div>
        <div className={styles.channel_icon}>
          <Icon src="" alt="仮実装" />
        </div>
        <div className={styles.channel_info}>
          <span>配信者名</span>
          <span>チャンネル名</span>
          <span>配信開始日</span>
        </div>
      </div>
    </section>
  );
};
