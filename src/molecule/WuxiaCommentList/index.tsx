import React from 'react';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';

const List = styled.div`
    overflow: hidden;
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
        font-size : 14px;
    }
`;

const Content = styled.div`
    font-size : 13px;
    margin-top : 6px;
`;

const Created = styled.div`
    color : gray;
    font-size : 12px;
    margin-top : 6px;
    margin-bottom : 6px;
`;



const WuxiaCommentList = ({ user, commentText, createdAt, onRemoveComment, nickname, commentId }: any) => {
    return (
        <List>
            <ListTitle>
                <div>{user?.userNickname}</div>
                {nickname === user?.userNickname && <FaTrashAlt onClick={() => onRemoveComment(commentId)}/>}
            </ListTitle>
            <Content>{commentText}</Content>
            <Created>{createdAt}</Created>
            <hr />
        </List>
    );
};

export default React.memo(WuxiaCommentList);
