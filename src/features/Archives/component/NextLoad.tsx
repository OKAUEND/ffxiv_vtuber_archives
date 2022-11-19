import React from 'react';

type handler = () => void;

interface IProps {
    handler: handler;
}

const NextLoad = ({ handler }: IProps) => {
    return (
        <div>
            <button onClick={() => handler()}>次をロード</button>
        </div>
    );
};

export default NextLoad;
