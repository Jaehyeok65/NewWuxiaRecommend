import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import rootreducer from './redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const store = createStore(
    rootreducer,
    // logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
    applyMiddleware(ReduxThunk, logger)
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
