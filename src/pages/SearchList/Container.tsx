import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Error from '../../module/Error';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getSearchWuxiaList } from '../../api/WuxiaAPI';
import Presentation from './Presentation';

const SearchListContainer = () => {
    const { title, input } = useParams(); //title에 맞게 서버에 데이터 요청할 것
    const { data, isError, error } = useSuspenseQuery({
        queryKey: ['search', input],
        queryFn: () => getSearchWuxiaList(input as string),
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

    return <Presentation data={data} input={input} title={title} />;
};

export default React.memo(SearchListContainer);
