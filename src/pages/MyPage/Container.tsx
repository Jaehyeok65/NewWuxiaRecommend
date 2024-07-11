import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Error from 'module/Error';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getWuxiaMyPage } from 'api/WuxiaAPI';
import MyPagePresentation from './Presentation';

const MyPageContainer = ({ nickname, loginstate }: any) => {
    const [title, setTitle] = useState('방문'); //default는 최근 방문한 작품
    const { data, error, isError } = useSuspenseQuery({
        queryKey: ['mypage', title],
        queryFn: () => getWuxiaMyPage(title),
        staleTime : 600000,
    });

    if (isError) return <Error error={error} />;

    return (
        <React.Fragment>
            {loginstate ? (
                <MyPagePresentation
                    data={data}
                    title={title}
                    nickname={nickname}
                    setTitle={setTitle}
                />
            ) : (
                <Navigate to="/login" replace={false} />
            )}
        </React.Fragment>
    );
};

export default MyPageContainer;
