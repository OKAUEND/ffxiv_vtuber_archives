import React from 'react';

//アイコンのサイズをPropsで指定したいので型の内容を制限する
type size = 'Large' | 'Medium' | 'Small';

type ImageProps = JSX.IntrinsicElements['img'];

type Props = ImageProps & {
    size: size;
    isradius: boolean;
};

export const IconElement = (props: Props): JSX.Element => {
    const elementSize = () => {
        switch (props.size) {
            case 'Large':
                return 'w-40 h-40';
            case 'Medium':
                return 'w-28 h-28';
            case 'Small':
                return 'w-16 h-16';
        }
    };

    const elementRadius = () => {
        return props.isradius ? 'rounded-full' : 'rounded-none';
    };

    return (
        <div className={`${elementRadius()} ${elementSize()}`}>
            <img {...props} />
        </div>
    );
};
