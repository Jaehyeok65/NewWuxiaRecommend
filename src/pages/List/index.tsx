import React, { useEffect } from 'react';
import MainFrame from '../MainFrame';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Loading from '../../module/Loading';
import Error from '../../module/Error';
import ListView from '../../module/ListView';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getWuxiaListByTitle } from '../../api/WuxiaAPI.tsx';
import useObserver from '../../hook/useObserver.tsx';
import useScroll from '../../hook/useScroll.tsx';

const Btn = styled.button`
    position: fixed;
    border: none;
    text-align: center;
    z-index: 9999999;
    background-color: white;
    &:hover {
        transform: translateY(-4px);
        cursor: pointer;
    }
    @media screen and (max-width: 2000px) {
        right: 20px;
        bottom: 50%;
        font-size: 22px;
    }
    @media screen and (max-width: 800px) {
        bottom: 20px;
        right: 50%;
        font-size: 16px;
    }
`;

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

const List = () => {
    const { title } = useParams(); //title에 맞게 서버에 데이터 요청할 것
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        data,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ['webtoon', title],
        queryFn: ({ pageParam = 1 }) => {
            return getWuxiaListByTitle(pageParam, title);
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.length < 12) {
                return undefined;
            } else {
                return allPages.length + 1;
            }
        },
        initialPageParam: 1,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        staleTime: 600000,
    });

    const ref = useObserver(hasNextPage, fetchNextPage);

    const scroll = useScroll(); //스크롤 높이 저장용

    useEffect(() => {
        //쓰로틀링 훅으로 스크롤 위치 저장함
        window.sessionStorage.setItem(`${title}_scroll`, String(scroll));
    }, [scroll, title]);

    useEffect(() => {
        const scrolly = window.sessionStorage.getItem(`${title}_scroll`);
        if (scrolly) {
            window.scrollTo({
                top: Number(scrolly),
            });
        }
    }, [title]);

    if (isLoading)
        return (
            <Loading
                height={'5%'}
                width={'3%'}
                marginBottom={'5%'}
                marginTop={'5%'}
            />
        );

    if (isError) return <Error error={error} />;

    return (
        <MainFrame>
            <h2 id={'viewPort'} style={{ fontSize: '20px', marginTop: '2%' }}>
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
};

export default React.memo(List);
