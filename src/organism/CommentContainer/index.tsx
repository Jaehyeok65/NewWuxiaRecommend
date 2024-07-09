import React, { useState } from 'react';
import WuxiaCommentList from 'molecule/WuxiaCommentList';
import WuxiaReComment from 'molecule/WuxiaReComment';
import CommentBox from 'molecule/CommentBox';

const CommentContainer = ({
    data,
    nickname,
    onRemoveComment,
    onRecommendComment,
    onToggleShowReplyArea,
    isShowReplyArea,
    wuxiacomment,
    setWuxiaComment,
    onWuxiaCommentSubmit,
    loginstate,
    wuxiarecomment,
    setWuxiaReComment,
    onWuxiaReCommentSubmit
}: any) => {
    return (
        <React.Fragment>
            <CommentBox
                wuxiacomment={wuxiacomment}
                setWuxiaComment={setWuxiaComment}
                onWuxiaCommentSubmit={onWuxiaCommentSubmit}
                loginstate={loginstate}
            />
            {Array.isArray(data) &&
                data?.map((item: any) => (
                    <div key={item?.wuxiaCommentId}>
                        <WuxiaCommentList
                            user={item?.user}
                            commentText={item?.contentText}
                            createdAt={item?.createdAt}
                            nickname={nickname}
                            commentId={item?.wuxiaCommentId}
                            onRemoveComment={onRemoveComment}
                            onRecommendComment={onRecommendComment}
                            recommendation={item?.recommendationcount}
                            onToggleShowReplyArea={onToggleShowReplyArea}
                        />
                        {isShowReplyArea[item?.wuxiaCommentId]?.show && (
                            <WuxiaReComment
                                wuxiarecomment={wuxiarecomment}
                                setWuxiaReComment={setWuxiaReComment}
                                loginstate={loginstate}
                                nickname={nickname}
                                onWuxiaCommentSubmit={(e : any) => onWuxiaReCommentSubmit(e, item?.wuxiaCommentId)}
                                data={
                                    isShowReplyArea[item?.wuxiaCommentId]?.data
                                }
                            />
                        )}
                    </div>
                ))}
        </React.Fragment>
    );
};

export default React.memo(CommentContainer);
