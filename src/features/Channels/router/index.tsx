import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChannelPanel } from '../component/ChannelPanel';

export const Channels = () => {
    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<ChannelPanel />} />
                </Routes>
            </div>
        </div>
    );
};
