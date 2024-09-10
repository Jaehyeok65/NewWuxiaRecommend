import React from 'react';
import MainFrame from '../MainFrame';
import ListView from '../../module/ListView';
import Error from '../../module/Error';
import Loading from '../../module/Loading';

interface ListProps {
    title: string | undefined;
    data: any;
    isFetchingNextPage: boolean;
    isError: boolean;
    error: any;
    isPending: boolean;
}

const cardstyle = {
    height: '100%',
    mobileheight: '100%',
};

const ListPresentation = React.forwardRef<HTMLDivElement, ListProps>(
    (
        {
            data,
            isError,
            error,
            title,
            isFetchingNextPage,
            isPending,
        }: ListProps,
        ref
    ) => {
        if (isPending) {
            return (
                <Loading
                    height={'5%'}
                    width={'3%'}
                    marginBottom={'2%'}
                    marginTop={'2%'}
                />
            );
        }

        if (isError) return <Error error={error} />;

        return (
            <MainFrame>
                <h2
                    id={'viewPort'}
                    style={{ fontSize: '20px', marginTop: '2%' }}
                >
                    {title}
                </h2>
                <ListView data={data} cardstyle={cardstyle} />
                <div ref={ref} />
                {isFetchingNextPage && (
                    <Loading
                        height={'5%'}
                        width={'3%'}
                        marginBottom={'2%'}
                        marginTop={'2%'}
                    />
                )}
            </MainFrame>
        );
    }
);

export default React.memo(ListPresentation);
