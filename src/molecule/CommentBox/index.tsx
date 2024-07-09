import React from 'react';
import styled from 'styled-components';
import Button from 'atoms/Button';

const Comment = styled.textarea`
    width: 99%;
    height: 50px;
    padding: 4px;

    @media screen and (max-width: 1000px) {
        padding: 2px;
    }
`;

const FormBox = styled.form``;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

const CommentBox = ({
    wuxiacomment,
    setWuxiaComment,
    onWuxiaCommentSubmit,
    loginstate,
}: any) => {
    const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setWuxiaComment((prev: any) => ({
            ...prev,
            comment_text: value,
        }));
    };

    return (
        <FormBox onSubmit={onWuxiaCommentSubmit}>
            <Comment
                placeholder={
                    loginstate
                        ? '댓글을 입력하세요...'
                        : '댓글을 입력하려면 로그인이 필요합니다...'
                }
                value={wuxiacomment?.comment_text}
                onChange={onCommentChange}
            />
            <ButtonContainer>
                <Button
                    styled={{
                        width: '80px',
                        borderRadius: '4px',
                        display: 'block',
                        marginBottom: '2%',
                        marginTop: '2%',
                        padding: '8px',
                    }}
                >
                    등록하기
                </Button>
            </ButtonContainer>
        </FormBox>
    );
};

export default React.memo(CommentBox);
