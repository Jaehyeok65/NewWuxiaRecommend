import React, { useState, useCallback } from 'react';
import CommentContainer from 'organism/CommentContainer';
import {
    useQueryClient,
    useMutation,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { getWuxiaCommentList, Formatting, TransComment } from 'api/CommentAPI';
import { getuserId } from 'api/LoginAPI';
import {
    saveWuxiaComment,
    deleteWuxiaComment,
    recommendWuxiaComment,
} from 'api/CommentAPI';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { showAlert } from 'redux/action';
import { useNavigate } from 'react-router-dom';
import { WuxiaComment, Wuxia } from 'type/type';


interface WuxiaCommentProps {
    title : string | undefined;
    data : Wuxia;
    nickname : string;
    loginstate : boolean;
}

const WuxiaComments = ({ title, data, nickname, loginstate }: WuxiaCommentProps) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const memoizedNavigate = useCallback(navigate, []);

    const { data: commentdata } = useSuspenseQuery({
        queryKey: ['productcomment', title],
        queryFn: () => getWuxiaCommentList(title),
        staleTime: 600000,
    });

    const [wuxiacomment, setWuxiaComment] = useState<WuxiaComment>({
        wuxia: data,
        user_id: getuserId(),
        content: '',
        createdAt: Formatting(new Date()),
    });

    const [isShowReplyArea, setIsShowReplyArea] = useState<{
        [key: number]: {
            show: boolean;
        };
    }>({}); //각각의 Id를 통해 state 관리

    const SaveWuxiaCommentMutation = useMutation({
        mutationFn: (wuxiacomment : WuxiaComment) => {
            return saveWuxiaComment(wuxiacomment);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(
                ['productcomment', title],
                TransComment(data)
            );
            setWuxiaComment((prev: any) => ({
                ...prev,
                comment_text: '', // 빈 문자열로 설정
            }));
            dispatch(showAlert('댓글 등록 완료!', uuidv4(), 4000));
        },
    });

    const DeleteWuxiaCommentMutation = useMutation({
        mutationFn: (commentId: number) => {
            return deleteWuxiaComment(commentId);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(
                ['productcomment', title],
                TransComment(data)
            );
            dispatch(showAlert('댓글 삭제 완료!', uuidv4(), 4000));
        },
    });

    const RecommendWuxiaCommentMutation = useMutation({
        mutationFn: (commentId: number) => {
            return recommendWuxiaComment(commentId);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(
                ['productcomment', title],
                TransComment(data)
            );
            dispatch(showAlert('댓글 좋아요 완료!', uuidv4(), 4000));
        },
    });

    const onWuxiaCommentSubmit = (e: any) => {
        e.preventDefault();
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            memoizedNavigate('/login');
            return;
        }
        SaveWuxiaCommentMutation.mutate(wuxiacomment);
    };

    const onRemoveComment = (commentId: number) => {
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            memoizedNavigate('/login');
            return;
        }

        DeleteWuxiaCommentMutation.mutate(commentId);
    };

    const onRecommendComment = (commentId: number) => {
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            memoizedNavigate('/login');
            return;
        }

        RecommendWuxiaCommentMutation.mutate(commentId);
    };

    const onToggleShowReplyArea = (wuxiaCommentId: number) => {
        setIsShowReplyArea((prev) => {
            const isShowReply = prev[wuxiaCommentId] || {
                show: false,
            };
            return {
                ...prev,
                [wuxiaCommentId]: {
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
            />
        </React.Fragment>
    );
};

export default React.memo(WuxiaComments);
