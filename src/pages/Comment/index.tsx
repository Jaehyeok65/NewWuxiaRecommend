import React, { Suspense, lazy } from 'react';
import Loading from 'module/Loading';

const Container = lazy(() => import('./Container'));

const CommentIndex = ({ loginstate, nickname }: any) => {
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
            <Container loginstate={loginstate} nickname={nickname} />
        </Suspense>
    );
};

export default React.memo(CommentIndex);
