import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCommentList } from 'api/CommentAPI';
import CommunityPresentation from './Presentation';

const Container = ({ loginstate }: any) => {
    const [Selected, setSelected] = useState('최신순');
    const { data } = useSuspenseQuery({
        queryKey: ['commentlist', Selected],
        queryFn: () => getCommentList(Selected),
    });

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const selectList = ['최신순', '추천순'];
    const navigate = useNavigate();

    useEffect(() => {
        handleScroll();
    }, [page]);

    const handleSelect = useCallback((e: any) => {
        setSelected(e.target.value);
        setPage(1); //페이지를 1페이지로 바꿈
    }, []);

    const isLoginToggle = useCallback(() => {
        window.alert('로그인이 필요한 기능입니다.');
        navigate('/login');
    }, []);

    const handleScroll = useCallback(() => {
        if (window.scrollY > 0) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }, []);

    return (
        <React.Fragment>
            <CommunityPresentation
                data={data}
                loginstate={loginstate}
                isLoginToggle={isLoginToggle}
                handleSelect={handleSelect}
                limit={limit}
                setLimit={setLimit}
                offset={offset}
                page={page}
                setPage={setPage}
                Selected={Selected}
                selectList={selectList}
            />
        </React.Fragment>
    );
};

export default React.memo(Container);
