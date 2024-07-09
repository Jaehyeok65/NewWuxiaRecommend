import React from 'react';
import styled from 'styled-components';
import CommentContainer from 'organism/CommentContainer';

const Container = styled.div`
    width: 90%;
    margin-left: 10%;
`;

const WuxiaReComment = ({
    wuxiarecomment,
    setWuxiaReComment,
    loginstate,
    data,
    nickname,
    onWuxiaCommentSubmit
}: any) => {
    return (
        <Container>
            <CommentContainer
                wuxiacomment={wuxiarecomment}
                setWuxiaComment={setWuxiaReComment}
                loginstate={loginstate}
                data={data}
                nickname={nickname}
                onWuxiaCommentSubmit={onWuxiaCommentSubmit}
            />
        </Container>
    );
};

export default React.memo(WuxiaReComment);
