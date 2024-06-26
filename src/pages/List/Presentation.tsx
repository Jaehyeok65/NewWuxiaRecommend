import React from 'react';
import MainFrame from '../MainFrame';
import ListView from '../../module/ListView';
import Error from '../../module/Error';
import Loading from '../../module/Loading';

interface ListProps {
    title: string | undefined;
    data: any;
    ref: React.RefObject<HTMLDivElement>;
    isFetchingNextPage: boolean;
    isError: boolean;
    error: any;
    isPending: boolean;
}

const cardstyle = {
    height: '100%',
    mobileheight: '100%',
};

const cardinfostyle = {
    title: {
        marginBottom: '5%',
        fontSize: '14px',
    },
    subtext: {
        marginBottom: '5%',
        fontSize: '12px',
        color: 'gray',
    },
    icon: {
        fontSize: '15px',
        color: 'red',
    },
    span: {
        fontSize: '14px',
        verticalAlign: 'top',
        marginLeft: '8px',
    },
    text: {
        fontSize: '12px',
        marginTop: '5%',
    },
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
                <ListView
                    data={data}
                    cardstyle={cardstyle}
                    cardinfostyle={cardinfostyle}
                />
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
