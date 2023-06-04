'use client';

import styles from '@/archives/_styles/archives.module.scss';

interface IProps {
  Archives: GoogleApiYouTubeSearchResource[];
}

const createHighQuality720URL = (videoId: string): string => {
  return `https://i.ytimg.com/vi/${videoId}/hq720.jpg`;
};

export const ArchiveList = ({ Archives }: IProps) => {
  const converDayTime = (time: string) => {
    const date = new Date(time);
    return `${date.getFullYear()}年 ${date.getMonth()}月${date.getDate()}日`;
  };

  return (
    <ul className={styles.container}>
      {Archives.map((archive, index) => (
        <li key={index} className={styles.panel}>
          <div className={styles.thumbnail}>
            <a
              href={`https://www.youtube.com/watch?v=${archive.id.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={archive.snippet.thumbnails.medium.url} />
            </a>
          </div>
          <div className={styles.info}>
            <p className={styles.archive_title}>{archive.snippet.title}</p>
            <div className="text-sm h-1/2 text-gray-400">
              {archive.snippet.publishedAt}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
