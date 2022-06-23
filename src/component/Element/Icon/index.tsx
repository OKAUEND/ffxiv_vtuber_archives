import React from 'react';

//アイコンのサイズをPropsで指定したいので型の内容を制限する
type size = 'Large' | 'Medium' | 'Small';

interface Props {
    desc: string;
    path: string;
    size: size;
    isRadius: boolean;
}

export const IconElement = (props: Props): JSX.Element => {
    return (
        <div>
            <img src={props.path} alt={} />
        </div>
    );
};
