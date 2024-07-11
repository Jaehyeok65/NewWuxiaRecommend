import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getComment, updateComment } from 'api/CommentAPI';
import CommentUpdatePresentation from './Presentation';

const CommentUpdate = ({ loginstate }: any) => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { data } = useSuspenseQuery({
        queryKey: ['comment', id],
        queryFn: () => getComment(id),
        staleTime : 600000,
    });

    const UpdateMutation = useMutation({
        mutationFn: () => {
            return updateComment(comment);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: ['comment', id],
            });
        },
    });

    const [comment, setComment] = useState<any>(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loginstate) {
            window.alert('로그인이 필요합니다.');
            navigate('/community');
        }
    }, []);

    useEffect(() => {
        if (data) {
            setComment(data);
            return;
        }
    }, [data]);

    const onSubmit = (e : any) => {
        e.preventDefault();
        if (!comment) {
            return;
        }
        if (comment.title.trim() === '') {
            window.alert('제목을 입력하세요');
            return;
        }
        if (comment.content.trim() === '') {
            window.alert('내용을 입력하세요');
            return;
        }
        UpdateMutation.mutate(comment);
        navigate(`/comment/${comment.id}`);
    };

    const onChange = (e : any) => {
        const { name, value } = e.target;
        setComment((prev : any) => ({ ...prev, [name]: value }));
    };

    if (!data) return null;

    return (
        <React.Fragment>
            <CommentUpdatePresentation
                comment={comment}
                onSubmit={onSubmit}
                onChange={onChange}
            />
        </React.Fragment>
    );
};

export default React.memo(CommentUpdate);
