import React, { Suspense, lazy } from 'react';
import WuxiaCommentList from 'molecule/WuxiaCommentList';
import Loading from 'module/Loading';
import CommentBox from 'molecule/CommentBox';

const WuxiaReComment = lazy(() => import('molecule/WuxiaReComment'));

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
                    <div key={item?.id}>
                        <WuxiaCommentList
                            user={item?.user}
                            commentText={item?.content}
                            createdAt={item?.createdAt}
                            nickname={nickname}
                            commentId={item?.id}
                            onRemoveComment={onRemoveComment}
                            onRecommendComment={onRecommendComment}
                            recommendation={item?.recommendationcount}
                            onToggleShowReplyArea={onToggleShowReplyArea}
                        />
                        <Suspense
                            fallback={
                                <Loading
                                    width="3%"
                                    height="3%"
                                    marginBottom="3%"
                                    marginTop="3%"
                                />
                            }
                        >
                            {isShowReplyArea &&
                                isShowReplyArea[item?.wuxiaCommentId]?.show && (
                                    <WuxiaReComment
                                        wuxiaCommentId={item?.wuxiaCommentId}
                                        loginstate={loginstate}
                                        nickname={nickname}
                                    />
                                )}
                        </Suspense>
                    </div>
                ))}
        </React.Fragment>
    );
};

export default React.memo(CommentContainer);
