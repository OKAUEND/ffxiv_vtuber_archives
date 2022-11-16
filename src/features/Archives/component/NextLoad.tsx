import React from 'react';

type handler = () => void;

interface Props {
    handler: handler;
}

const NextLoad = ({ handler }: Props) => {
    return (
        <div>
            <button onClick={() => handler()}>次をロード</button>
        </div>
    );
};

export default NextLoad;
