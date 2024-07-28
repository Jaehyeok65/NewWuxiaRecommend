import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    useSuspenseQuery,
    useQueryClient,
    useMutation,
} from '@tanstack/react-query';
import { getComment, deleteComment, getCommentRecommend } from 'api/CommentAPI';
import CommentPresentation from './Presentation';

const CommentContainer = ({ loginstate, nickname }) => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const { data } = useSuspenseQuery({
        queryKey: ['comment', id],
        queryFn: () => getComment(id),
        staleTime: 600000,
    });
    const navigate = useNavigate();

    const CommentDeleteMutation = useMutation({
        mutationFn: () => {
            return deleteComment(id);
        },
        onSuccess: (data) => {
            return queryClient.setQueryData(['commentlist', '최신순'], data);
        },
    });

    const RecommendMutation = useMutation({
        mutationFn: () => {
            return getCommentRecommend(id);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['comment', id], data);
        },
    });

    const onRecommendClick = useCallback(() => {
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            navigate('/login');
            return;
        }
        RecommendMutation.mutate(id);
    }, [id]);

    const onRemoveClick = useCallback(() => {
        const confirm = window.confirm('글을 삭제하시겠습니까?');
        if (confirm) {
            CommentDeleteMutation.mutate(id);
            navigate('/community');
        }
    }, [id]);

    return (
        <React.Fragment>
            <CommentPresentation
                data={data}
                nickname={nickname}
                onRemoveClick={onRemoveClick}
                onRecommendClick={onRecommendClick}
            />
        </React.Fragment>
    );
};

export default React.memo(CommentContainer);
