import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, Link, useParams } from 'react-router-dom';
import { ChannelPanel } from '../component/ChannelPanel';

export const Channels = () => {
    const testId = 'UCFpxoltilHCmuHWeERqsUlA';
    return (
        <div>
            <div>
                <Link to={testId}>
                    <ChannelPanel></ChannelPanel>
                </Link>
                <Routes>
                    <Route path="/:channelId" element={<Page1 />}></Route>
                </Routes>
            </div>
        </div>
    );
};

const Page1 = () => {
    const { channelId } = useParams();
    return <h2>TEST {channelId}</h2>;
};
