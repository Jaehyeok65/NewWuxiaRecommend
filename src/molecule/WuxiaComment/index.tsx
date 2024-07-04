import React from 'react';
import WuxiaCommentList from 'molecule/WuxiaCommentList';

const WuxiaComment = ({ data, nickname, onRemoveComment }: any) => {
    
    return (
        <React.Fragment>
            {data?.map((item: any, index: number) => (
                <WuxiaCommentList
                    key={index}
                    user={item?.user}
                    commentText={item?.commentText}
                    createdAt={item?.createdAt}
                    nickname={nickname}
                    commentId={item?.commentId}
                    onRemoveComment={onRemoveComment}
                />
            ))}
        </React.Fragment>
    );
};

export default React.memo(WuxiaComment);
