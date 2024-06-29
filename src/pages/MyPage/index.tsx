import React, { lazy, Suspense } from 'react';
import Loading from 'module/Loading';

const MyPageContainer = lazy(() => import('./Container'));

const MyPageIndex = ({ loginstate, nickname }: any) => {
    return (
        <Suspense
            fallback={
                <Loading
                    width={'5%'}
                    height={'5%'}
                    marginBottom={'5%'}
                    marginTop={'5%'}
                />
            }
        >
            <MyPageContainer loginstate={loginstate} nickname={nickname} />
        </Suspense>
    );
};

export default React.memo(MyPageIndex);
