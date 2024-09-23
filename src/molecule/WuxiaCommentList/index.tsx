import React from 'react';
import styled from 'styled-components';
import { FaTrashAlt, FaThumbsUp } from 'react-icons/fa';
import { User } from 'type/type';

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

interface WuxiaCommentListProps {
    user: User;
    commentText: string;
    createdAt: string;
    onRemoveComment: (key: number) => void;
    nickname: string;
    commentId: number;
    recommendation: number;
    onRecommendComment: (key: number) => void;
    onToggleShowReplyArea: (key: number) => void;
}

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
}: WuxiaCommentListProps) => {
    return (
        <List>
            <ListTitle>
                <div>{user?.userNickname}</div>
                {nickname === user?.userNickname && (
                    <FaTrashAlt onClick={() => onRemoveComment(commentId)} data-testid='commentdelete' />
                )}
            </ListTitle>
            <Content>{commentText && commentText}</Content>
            <Created>{createdAt && createdAt}</Created>
            <ListTitle>
                {onToggleShowReplyArea && (
                    <button onClick={() => onToggleShowReplyArea(commentId)}>
                        답글
                    </button>
                )}
                {recommendation !== undefined && (
                    <div>
                        <FaThumbsUp
                            onClick={() => onRecommendComment(commentId)}
                            data-testid='commentrecommend'
                        />
                        {' ' + recommendation}
                    </div>
                )}
            </ListTitle>
            <hr />
        </List>
    );
};

export default React.memo(WuxiaCommentList);