import React, { ReactNode } from 'react';

type size = 'small' | 'medium' | 'large' | 'auto';

const ElementSize = (size: size): string => {
    switch (size) {
        case 'small':
            return 'w-8 h-4 md:w-16 md:h-8';
        case 'medium':
            return 'w-14 h-7 md:w-40 md:h-14';
        case 'large':
            return 'w-20 h-10 md:w-60 md:h-20';
        case 'auto':
            return 'w-full h-full';
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
            className={`${ElementSize(Props.size)} ${ElementColor(
                'default'
            )} md:rounded`}>
            {Props.children}
        </button>
    );
};
