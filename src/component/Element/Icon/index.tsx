'use client';

import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export const Icon = ({
  src,
  alt,
  width = 48,
  height = 48,
}: Props): JSX.Element => {
  const youtubeIconURL = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ICON_URL;
  return (
    <div className="rounded-full">
      <Image
        src={`https://yt3.ggpht.com/ytc/${src}`}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
};
