import React from 'react';
import styled from 'styled-components';
import { FaTrashAlt, FaThumbsUp } from 'react-icons/fa';

const List = styled.div`
    height: 100%;
    width: 100%;
    max-height: 100px;
    padding: 5px;
    margin-bottom: 10px;
`;

const ListTitle = styled.div`
    display: flex;
    justify-content: space-between;

    > div {
        font-weight: bold;
        font-size: 14px;
    }
`;

const Content = styled.div`
    font-size: 13px;
    margin-top: 6px;
`;

const Created = styled.div`
    color: gray;
    font-size: 12px;
    margin-top: 6px;
    margin-bottom: 6px;
`;

const WuxiaCommentList = ({
    user,
    commentText,
    createdAt,
    onRemoveComment,
    nickname,
    commentId,
    recommendation,
    onRecommendComment,
    onToggleShowReplyArea,
}: any) => {

    return (
        <List>
            <ListTitle>
                <div>{user?.userNickname}</div>
                {nickname === user?.userNickname && (
                    <FaTrashAlt onClick={() => onRemoveComment(commentId)} />
                )}
            </ListTitle>
            <Content>{commentText}</Content>
            <Created>{createdAt}</Created>
            <ListTitle>
                <button onClick={() => onToggleShowReplyArea(commentId)}>
                    답글
                </button>
                <div>
                    <FaThumbsUp onClick={() => onRecommendComment(commentId)} />
                    {' ' + recommendation}
                </div>
            </ListTitle>
            <hr />
        </List>
    );
};

export default React.memo(WuxiaCommentList);
