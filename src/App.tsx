import React, { Suspense, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Link from 'next/link';
import { ArchiveRouter } from './features/Archives';
import { Channels } from './features/Channels';
import { RecoilRoot } from 'recoil';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Hello Vite + React!</p>
                <p>
                    <button
                        type="button"
                        onClick={() => setCount((count) => count + 1)}>
                        count is: {count}
                    </button>
                </p>
                <p>
                    Edit <code>App.tsx</code> and save to test HMR updates.
                </p>
                <p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer">
                        Learn React
                    </a>
                    {' | '}
                    <a
                        className="App-link"
                        href="https://vitejs.dev/guide/features.html"
                        target="_blank"
                        rel="noopener noreferrer">
                        Vite Docs
                    </a>
                </p>
            </header>
            <div className="bg-gray-800">
                <Routes>
                    <Route path="/">
                        <Route index element={<Channels />}></Route>
                        <Route
                            path="Channel/:channelID"
                            element={<ArchiveRouter />}></Route>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
