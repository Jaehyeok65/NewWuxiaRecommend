import React, { useCallback } from 'react';
import MainFrame from '../MainFrame';
import MainCarousel from '../../organism/MainCarousel';
import MainList from '../../organism/MainList';
import { useEffect } from 'react';
import Error from '../../module/Error';
import Loading from '../../module/Loading';
import { useQuery } from '@tanstack/react-query';
import { getMainList } from '../../api/WuxiaAPI.tsx';

const liststyle = {
    pcgrid: 'repeat(4,1fr)',
    tabletgrid: 'repeat(3,1fr)',
    mobilegrid: 'repeat(2,1fr)',
    gap: '20px 40px',
};

const Main = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['main'],
        queryFn: getMainList,
        staleTime : 600000,
    });

    const handleScroll = useCallback(() => {
        if (window.scrollY > 0) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }, []);

    useEffect(() => {
        handleScroll();
    }, []);

    if (isLoading) return <Loading />;
    if (isError) return <Error error={error} />;
    if (!data) return null;

    return (
        <MainFrame>
            <MainCarousel list={data[0]} />
            <MainList list={data[0]} title="조회수 TOP 12" styled={liststyle} />
            <MainList list={data[1]} title="좋아요 TOP 12" styled={liststyle} />
            <MainList list={data[2]} title="별점 TOP 12" styled={liststyle} />
        </MainFrame>
    );
};

export default React.memo(Main);
