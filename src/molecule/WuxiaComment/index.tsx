import React from 'react';
import WuxiaCommentList from 'molecule/WuxiaCommentList';

const WuxiaComment = ({ data, nickname, onRemoveComment, onRecommendComment }: any) => {
    
    return (
        <React.Fragment>
            {data?.map((item: any, index: number) => (
                <WuxiaCommentList
                    key={index}
                    user={item?.user}
                    commentText={item?.contentText}
                    createdAt={item?.createdAt}
                    nickname={nickname}
                    commentId={item?.wuxiaCommentId}
                    onRemoveComment={onRemoveComment}
                    onRecommendComment={onRecommendComment}
                    recommendation={item?.recommendationcount}
                />
            ))}
        </React.Fragment>
    );
};

export default React.memo(WuxiaComment);
