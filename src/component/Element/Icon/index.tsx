import React from 'react';

//アイコンのサイズをPropsで指定したいので型の内容を制限する
type size = 'Large' | 'Medium' | 'Small';

type ImageProps = JSX.IntrinsicElements['img'];

type Props = ImageProps & {
    size: size;
    isRadius: boolean;
};

export const IconElement = (props: Props): JSX.Element => {
    return (
        <div>
            <img {...props} />
        </div>
    );
};
