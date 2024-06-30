import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getWuxiaListByTitle } from 'api/WuxiaAPI';
import useObserver from 'hook/useObserver';
import useScroll from 'hook/useScroll';
import Presentation from './Presentation';

const List = () => {
    const { title } = useParams(); //title에 맞게 서버에 데이터 요청할 것
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        data,
        isError,
        error,
    } = useSuspenseInfiniteQuery({
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
        if (scroll > 0) {
            window.sessionStorage.setItem(`${title}_scroll`, String(scroll));
        }
    }, [scroll]);

    useEffect(() => {
        const scrolly = window.sessionStorage.getItem(`${title}_scroll`);
        if (scrolly) {
            window.scrollTo({
                top: Number(scrolly),
            });
        }
    }, [title]);

    return (
        <React.Fragment>
            <Presentation
                data={data}
                isError={isError}
                isFetchingNextPage={isFetchingNextPage}
                error={error}
                title={title}
                ref={ref}
                isPending={isPending}
            />
        </React.Fragment>
    );
};

export default React.memo(List);
