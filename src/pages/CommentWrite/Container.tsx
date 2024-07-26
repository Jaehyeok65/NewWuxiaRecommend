import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentWritePresentation from './Presentation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveComment, Formatting } from 'api/CommentAPI';

const WriteContainer = ({ loginstate, nickname }: any) => {
    const [comment, setComment] = useState({
        title: '',
        content: '',
        writer: nickname,
        date: Formatting(new Date()),
        view: 0,
        recommend: 0,
    });

    const queryClient = useQueryClient();

    const WriteMutation = useMutation({
        mutationFn: (comment: any) => {
            return saveComment(comment);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: ['commentlist'],
            });
        },
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!loginstate) {
            window.alert('로그인이 필요합니다.');
            navigate('/community');
        }
    }, []);

    useEffect(() => {
        setComment({
            ...comment,
            writer: nickname,
        });
    }, [nickname]);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (comment.title.trim() === '') {
            window.alert('제목을 입력하세요');
            return;
        }
        if (comment.content.trim() === '') {
            window.alert('내용을 입력하세요');
            return;
        }
        WriteMutation.mutate(comment);
        navigate(`/community`);
    };

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setComment((prev: any) => ({ ...prev, [name]: value }));
    };

    return (
        <React.Fragment>
            <CommentWritePresentation
                comment={comment}
                onSubmit={onSubmit}
                onChange={onChange}
            />
        </React.Fragment>
    );
};

export default React.memo(WriteContainer);
