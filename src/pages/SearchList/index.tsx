import React, { useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import Error from '../../module/Error';
import { useQuery } from '@tanstack/react-query';
import { getSearchWuxiaList } from '../../api/WuxiaAPI';
import Loading from '../../module/Loading.jsx';

const SearchResult = lazy(() => import('./SearchResult'));

const SearchList = () => {
    const { title, input } = useParams(); //title에 맞게 서버에 데이터 요청할 것
    const { data, isError, error } = useQuery({
        queryKey: ['search', input],
        queryFn: () => getSearchWuxiaList(input as string),
        enabled: !!input,
    });

    const handleScroll = () => {
        if (!window.scrollY) return;
        // 현재 위치가 이미 최상단일 경우 return

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        handleScroll();
    }, [title]);

    if (isError) {
        return <Error error={error} />;
    }

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
            <SearchResult data={data} input={input} title={title} />
        </Suspense>
    );
};

export default React.memo(SearchList);
