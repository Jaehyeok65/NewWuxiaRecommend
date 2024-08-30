import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootreducer from 'redux/reducers';

export const RenderWithProvider = ({ children, route = '/' }: any) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // ✅ turns retries off
                retry: false,
            },
        },
    });

    const store = createStore(rootreducer, {});

    return (
        <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
        </Provider>
    );
};
