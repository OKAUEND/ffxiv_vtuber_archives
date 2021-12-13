import {} from 'react';
import React from 'react';

export const NextLoad = () => {
    const isRender = false;
    return <div>{isRender === false && <button>次を読み込み</button>}</div>;
};
