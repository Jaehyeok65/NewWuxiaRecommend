import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootreducer from 'redux/reducers';

export const RenderWithProviders = ({ children, route = '/' }: any) => {
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
            <MemoryRouter initialEntries={[route]}>
                <QueryClientProvider client={queryClient}>
                    <Routes>{children}</Routes>
                </QueryClientProvider>
            </MemoryRouter>
        </Provider>
    );
};

export const RenderWithProvidersNoRoutes = ({ children, route = '/' }: any) => {
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
            <MemoryRouter initialEntries={[route]}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </MemoryRouter>
        </Provider>
    );
};
