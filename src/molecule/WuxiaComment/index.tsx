import React, { useState } from 'react';
import CommentContainer from 'organism/CommentContainer';

const WuxiaComment = ({
    commentdata,
    nickname,
    onRemoveComment,
    onRecommendComment,
    wuxiacomment,
    setWuxiaComment,
    onWuxiaCommentSubmit,
    loginstate,
    wuxiarecomment,
    setWuxiaReComment,
    recommentdata,
    onWuxiaReCommentSubmit,
}: any) => {
    const [isShowReplyArea, setIsShowReplyArea] = useState<{
        [key: number]: {
            show: boolean;
            data: [];
        };
    }>({}); //각각의 Id를 통해 state 관리

    const onToggleShowReplyArea = (wuxiaCommentId: number) => {
        //여기서 추가 로직 === 답글 버튼을 누르면 해당하는 CommentId에 대한 RecommentData를 서버에서 가져와야함
        setIsShowReplyArea((prev) => {
            // 현재 상태 객체에서 해당 ID의 show 값을 토글하거나, 해당 ID가 존재하지 않으면 기본값을 설정
            const isShowReply = prev[wuxiaCommentId] || {
                show: false,
                data: [],
            };
            return {
                ...prev,
                [wuxiaCommentId]: {
                    ...isShowReply,
                    show: !isShowReply.show,
                },
            };
        });
    };

    return (
        <React.Fragment>
            <CommentContainer
                data={commentdata}
                nickname={nickname}
                onRecommendComment={onRecommendComment}
                onRemoveComment={onRemoveComment}
                wuxiacomment={wuxiacomment}
                setWuxiaComment={setWuxiaComment}
                onWuxiaCommentSubmit={onWuxiaCommentSubmit}
                loginstate={loginstate}
                isShowReplyArea={isShowReplyArea}
                onToggleShowReplyArea={onToggleShowReplyArea}
                wuxiarecomment={wuxiarecomment}
                setWuxiaReComment={setWuxiaReComment}
                onWuxiaReCommentSubmit={onWuxiaReCommentSubmit}
            />
        </React.Fragment>
    );
};

export default React.memo(WuxiaComment);
