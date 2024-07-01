import React, { Suspense, lazy } from 'react';
import Loading from '../../module/Loading.jsx';

const SearchListContainer = lazy(() => import('./Container'));

const SearchListIndex = () => {
    return (
        <Suspense
            fallback={
                <Loading
                    marginBottom={'5%'}
                    marginTop={'5%'}
                    width={'5%'}
                    height={'5%'}
                />
            }
        >
            <SearchListContainer />
        </Suspense>
    );
};

export default React.memo(SearchListIndex);
