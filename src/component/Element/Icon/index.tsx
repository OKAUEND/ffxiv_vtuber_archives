import Image from 'next/image';

type Props = {
    src: string;
    alt: string;
    width: number;
    heidht: number;
};

export const Icon = (props: Props): JSX.Element => {
    return <Image src={props.src} alt={props.alt} width={48} height={48} />;
};
