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
    return <Image src={src} alt={alt} width={width} height={height} />;
};
