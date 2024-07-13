import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Wuxia } from 'type/type';
import { saveWuxiaProduct } from 'api/WuxiaAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showAlert } from 'redux/action';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';


const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
    margin: auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
`;

const Textarea = styled.textarea`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    resize: vertical;
`;

const Button = styled.button`
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const Admin = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [wuxia, setWuxia] = useState<Wuxia>({
        title: '',
        writer: '',
        url: '',
        content: '',
        link: '',
        rate : 0,
    });

    const saveWuxiaMutation = useMutation({
        mutationFn: (data: Wuxia) => {
            return saveWuxiaProduct(data);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: ['webtoon'],
            });
        },
        onSuccess : () => {
            dispatch(showAlert('작품 등록 완료!', uuidv4(), 4000));
            navigate('/');
        }
    });

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setWuxia((prev: Wuxia) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        saveWuxiaMutation.mutate(wuxia);
        // 폼 제출 처리 로직
    };

    return (
        <Form onSubmit={onSubmit}>
            <Input
                type="text"
                name="title"
                value={wuxia.title}
                onChange={onChange}
                placeholder="제목을 입력해주세요..."
            />
            <Input
                type="text"
                name="writer"
                value={wuxia.writer}
                onChange={onChange}
                placeholder="작가 이름을 입력해주세요..."
            />
            <Input
                type="text"
                name="url"
                value={wuxia.url}
                onChange={onChange}
                placeholder="이미지 주소를 입력해주세요..."
            />
            <Textarea
                name="content"
                value={wuxia.content}
                onChange={onChange}
                placeholder="작품 설명을 입력해주세요..."
            />
            <Input
                type="text"
                name="link"
                value={wuxia.link}
                onChange={onChange}
                placeholder="작품 바로가기 링크를 입력해주세요..."
            />
            <Button type="submit">제출</Button>
        </Form>
    );
};

export default React.memo(Admin);
