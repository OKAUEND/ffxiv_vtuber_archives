import React, { ReactNode } from 'react';

type size = 'small' | 'medium' | 'large';

const ElementSize = (size: size): string => {
    switch (size) {
        case 'small':
            return 'w-8 h-8 md:w-16 md:h-16';
        case 'medium':
            return 'w-14 h-14 md:w-28 md:h-28';
        case 'large':
            return 'w-20 h-20 md:w-40 md:h-40';
    }
};

type radius = 'none' | 'full';

const ElementRadius = (radius: radius): string => {
    switch (radius) {
        case 'none':
            return 'rounded-none';
        case 'full':
            return 'rounded-full';
    }
};

interface Props {
    children: ReactNode;
    handler: () => void;
    size: size;
    radius: radius;
}

export const Hover = (Props: Props) => {
    const handlerClick = () => {
        Props.handler();
    };

    return (
        <button
            onClick={handlerClick}
            className={`flex justify-center items-center ${ElementSize(
                Props.size
            )} ${ElementRadius(
                Props.radius
            )} hover:bg-gray-700 transition duration-150`}>
            {Props.children}
        </button>
    );
};
