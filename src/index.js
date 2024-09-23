import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import rootreducer from './redux/reducers';
import { createStore } from 'redux';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const store = createStore(
    rootreducer
); // 여러개의 미들웨어를 적용 할 수 있습니다.

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Provider>
);
