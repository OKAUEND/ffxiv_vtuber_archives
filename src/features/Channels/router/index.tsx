import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { ChannelPanel } from '../component/ChannelPanel';

export const Channels = () => {
    return (
        <div>
            <div>
                <Link to="hogehogepa-">TEST LINK</Link>
                <Routes>
                    <Route
                        path="/:channelId"
                        element={<ChannelPanel />}></Route>
                </Routes>
            </div>
        </div>
    );
};
