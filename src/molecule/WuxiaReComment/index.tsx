import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import CommentContainer from 'organism/CommentContainer';
import {
    useSuspenseQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import {
    getWuxiaReCommentList,
    Formatting,
    saveWuxiaReComment,
    deleteWuxiaReComment,
    recommendWuxiaReComment,
} from 'api/CommentAPI';
import { getuserId } from 'api/LoginAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showAlert } from 'redux/action';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
    width: 90%;
    margin-left: 10%;
`;

const WuxiaReComment = ({ wuxiaCommentId, loginstate, nickname }: any) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const { data: recommentdata } = useSuspenseQuery({
        queryKey: ['productrecomment', wuxiaCommentId],
        queryFn: () => getWuxiaReCommentList(wuxiaCommentId),
    });

    const [wuxiarecomment, setWuxiaReComment] = useState<any>({
        //reply에 필요한것
        user_id: getuserId(),
        comment_text: '',
        created_at: Formatting(new Date()),
        comment_id: wuxiaCommentId,
    });

    const navigate = useNavigate();
    const memoizedNavigate = useCallback(navigate, []);

    const SaveWuxiaReCommentMutation = useMutation({
        mutationFn: (wuxiarecomment: any) => {
            return saveWuxiaReComment(wuxiarecomment);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: ['productrecomment'],
            });
        },
        onSuccess: () => {
            setWuxiaReComment((prev: any) => ({
                ...prev,
                comment_text: '', // 빈 문자열로 설정
            }));
            dispatch(showAlert('답글 등록 완료!', uuidv4(), 4000));
        },
    });

    const DeleteWuxiaReCommentMutation = useMutation({
        mutationFn: (commentId: number) => {
            return deleteWuxiaReComment(commentId);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['productrecomment'] });
        },
        onSuccess: () => {
            dispatch(showAlert('답글 삭제 완료!', uuidv4(), 4000));
        },
    });

    const RecommendWuxiaReCommentMutation = useMutation({
        mutationFn: (commentId: number) => {
            return recommendWuxiaReComment(commentId);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['productrecomment'] });
        },
        onSuccess: () => {
            dispatch(showAlert('답글 좋아요 완료!', uuidv4(), 4000));
        },
    });

    const onWuxiaReCommentSubmit = (e: any) => {
        e.preventDefault();
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            memoizedNavigate('/login');
            return;
        }

        SaveWuxiaReCommentMutation.mutate(wuxiarecomment);
    };

    const onRemoveReComment = (commentId: number) => {
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            memoizedNavigate('/login');
            return;
        }
        console.log(commentId);

        DeleteWuxiaReCommentMutation.mutate(commentId);
    };

    const onRecommendReComment = (commentId: number) => {
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            memoizedNavigate('/login');
            return;
        }

        RecommendWuxiaReCommentMutation.mutate(commentId);
    };

    return (
        <Container>
            <CommentContainer
                data={recommentdata}
                loginstate={loginstate}
                nickname={nickname}
                wuxiacomment={wuxiarecomment}
                setWuxiaComment={setWuxiaReComment}
                onWuxiaCommentSubmit={onWuxiaReCommentSubmit}
                onRemoveComment={onRemoveReComment}
                onRecommendComment={onRecommendReComment}
            />
        </Container>
    );
};

export default React.memo(WuxiaReComment);
