import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/services/store.js';
import { App } from '@components/app/app';

import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
