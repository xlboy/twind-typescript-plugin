import { install } from '@twind/core';

import twindConfig from '../twind.config';
install(twindConfig);

import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
