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

export const Basic = () => {
    return <button></button>;
};
