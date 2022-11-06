import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Link from 'next/link';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
);
