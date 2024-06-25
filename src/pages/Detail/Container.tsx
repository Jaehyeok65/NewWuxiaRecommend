import React, { lazy, Suspense } from 'react';
import Loading from '../../module/Loading';

const Detail = lazy(() => import('./index'));

const Container = ({ loginstate }: any) => {
    return (
        <React.Fragment>
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
                <Detail loginstate={loginstate} />
            </Suspense>
        </React.Fragment>
    );
};

export default React.memo(Container);
