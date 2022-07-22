import React, { ReactNode } from 'react';

type size = 'small' | 'medium' | 'large';

const ElementSize = (size: size): string => {
    switch (size) {
        case 'small':
            return 'w-16 h-8';
        case 'medium':
            return 'w-28 h-14';
        case 'large':
            return 'w-40 h-20';
    }
};
type color = 'default' | 'green' | 'red' | 'blue';

const ElementColor = (color: color): string => {
    switch (color) {
        case 'green':
            return 'bg-green-600';
        case 'red':
            return 'bg-red-600';
        case 'blue':
            return 'bg-blue-600';
        default:
            return 'bg-gray-600';
    }
};

interface Props {
    children: ReactNode;
    handler: () => void;
    size: size;
    color: color;
}

export const Basic = (Props: Props) => {
    const handlerClick = () => {
        Props.handler();
    };
    return (
        <button
            onClick={handlerClick}
            className={`${ElementSize('medium')} ${ElementColor(
                'default'
            )} rounded`}></button>
    );
};
