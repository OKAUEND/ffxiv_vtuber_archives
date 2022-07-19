import React from 'react';

type size = 'small' | 'medium' | 'large';

const ElementSize = (size: size): string => {
    switch (size) {
        case 'small':
            return '';
        case 'medium':
            return '';
        case 'large':
            return '';
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

export const hover = () => {
    return (
        <button
            className={`${ElementSize('small')} ${ElementRadius(
                'none'
            )}`}></button>
    );
};
